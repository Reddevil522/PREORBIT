const QuestionImportService = require('../../services/admin/QuestionImportService');
const { sendSuccess, sendError } = require('../../utils/response');

exports.previewImport = async (req, res, next) => {
  try {
    const reqId = req.body._reqId || 'REQ-' + Math.floor(Math.random() * 1000);
    console.log(`[VALIDATION] Request received [ID: ${reqId}]`);
    const jsonObj = req.body;
    console.log(`[VALIDATION] File received [ID: ${reqId}]`);
    
    const result = await QuestionImportService.validateUpload(jsonObj);
    
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
    
    // Re-validate and insert
    const result = await QuestionImportService.importValidatedQuestions(jsonObj);
    
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
