const QuestionImportService = require('../../services/admin/QuestionImportService');
const ImportHistory = require('../../models/admin/ImportHistory');
const { sendSuccess, sendError } = require('../../utils/response');

exports.previewImport = async (req, res, next) => {
  try {
    const reqId = req.body._reqId || 'REQ-' + Math.floor(Math.random() * 1000);
    console.log(`[VALIDATION] Request received [ID: ${reqId}]`);
    const jsonObj = req.body;
    const isReplace = req.query.isReplace === 'true';
    console.log(`[VALIDATION] File received [ID: ${reqId}], isReplace: ${isReplace}`);
    
    const result = await QuestionImportService.validateUpload(jsonObj, isReplace);
    
    if (!result.valid) {
      // 200 OK with structured errors to prevent browser console error logs
      return res.status(200).json({
        success: false,
        message: 'Validation failed',
        errors: result.errors
      });
    }
    
    console.log(`[VALIDATION] Response sending [ID: ${reqId}]`);
    // Return both summary and question data for Admin preview
    return sendSuccess(res, 200, 'JSON is valid. Preview generated.', {
      summary: result.summary,
      questions: result.questions
    });

  } catch (error) {
    console.error(`[VALIDATION] Request completed with error:`, error);
    next(error);
  }
};

exports.executeImport = async (req, res, next) => {
  try {
    const jsonObj = req.body;
    const isReplace = req.query.isReplace === 'true';
    
    // Re-validate and insert
    const result = await QuestionImportService.importValidatedQuestions(jsonObj, isReplace);
    
    return sendSuccess(res, 201, 'Import Successful', result);
  } catch (error) {
    if (error.message && (error.message.startsWith('Upload rejected') || error.message.startsWith('Question'))) {
      return res.status(200).json({ success: false, message: error.message });
    }
    // Check for Mongoose Validation errors during insertion
    if (error.name === 'ValidationError') {
       return res.status(200).json({ success: false, message: `Database validation failed: ${error.message}` });
    }
    next(error);
  }
};

exports.getImportHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.module) filter.module = req.query.module;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.chapterSlug) filter.chapterSlug = req.query.chapterSlug;
    if (req.query.testId) filter.testId = req.query.testId;
    if (req.query.status) filter.status = req.query.status;

    const [imports, total] = await Promise.all([
      ImportHistory.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ImportHistory.countDocuments(filter)
    ]);

    return sendSuccess(res, 200, 'Import history retrieved successfully', {
      imports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};
