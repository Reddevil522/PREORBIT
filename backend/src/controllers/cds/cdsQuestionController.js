// ============================================================
// PREORBIT — CDS Question & Publishing Controller
// ============================================================

const CDSEnglishQuestion = require('../../models/cds/CDSEnglishQuestion');
const PracticeTest = require('../../models/PracticeTest');
const CDSTestPublishingService = require('../../services/cds/CDSTestPublishingService');
const { sendSuccess, sendError } = require('../../utils/response');

/**
 * Admin: Create and publish a test atomically after strict validation.
 * POST /api/cds/publish
 */
exports.createAndPublishTest = async (req, res, next) => {
  try {
    const isReplace = req.query.replace === 'true';
    const result = await CDSTestPublishingService.publishTest(req.body, isReplace);
    return sendSuccess(res, 201, result.message, result);
  } catch (error) {
    if (error.validationErrors) {
      return sendError(res, 400, 'CDS Test Validation Failed', { errors: error.validationErrors });
    }
    if (error.status === 409) {
      return sendError(res, 409, error.message);
    }
    next(error);
  }
};

/**
 * User Test Taking: Get questions for a test with correct answers and explanations stripped.
 * GET /api/cds/questions/:section/:chapterSlug/:testId
 */
exports.getQuestionsForTest = async (req, res, next) => {
  try {
    const { section, chapterSlug, testId } = req.params;

    const questions = await CDSEnglishQuestion.find(
      { section, chapterSlug, testId },
      { correctAnswer: 0, explanation: 0, __v: 0 }
    ).lean();

    return sendSuccess(res, 200, 'Questions retrieved successfully', {
      count: questions.length,
      questions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get complete questions for a test including correct answers.
 * GET /api/cds/questions/admin/:section/:chapterSlug/:testId
 */
exports.getQuestionsByTestAdmin = async (req, res, next) => {
  try {
    const { section, chapterSlug, testId } = req.params;

    const questions = await CDSEnglishQuestion.find({ section, chapterSlug, testId }).lean();

    return sendSuccess(res, 200, 'Questions retrieved successfully (Admin)', {
      count: questions.length,
      questions
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Get single question by ID.
 * GET /api/cds/questions/:id
 */
exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await CDSEnglishQuestion.findById(req.params.id);
    if (!question) return sendError(res, 404, 'Question not found');
    return sendSuccess(res, 200, 'Question retrieved', { question });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Update single question by ID.
 * PUT/PATCH /api/cds/questions/:id
 */
exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await CDSEnglishQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!question) return sendError(res, 404, 'Question not found');
    return sendSuccess(res, 200, 'Question updated successfully', { question });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin: Delete single question by ID.
 * DELETE /api/cds/questions/:id
 */
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await CDSEnglishQuestion.findByIdAndDelete(req.params.id);
    if (!question) return sendError(res, 404, 'Question not found');
    return sendSuccess(res, 200, 'Question deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * CDS English Dashboard Summary.
 * GET /api/cds/dashboard-summary
 */
exports.getDashboardSummary = async (req, res, next) => {
  try {
    const sections = ['grammar', 'vocabulary', 'reading-comprehension'];
    const summary = {};

    for (const sec of sections) {
      const tests = await PracticeTest.find({
        module: 'cds',
        $or: [{ subject: sec }, { section: sec }],
        status: { $in: ['available', 'locked'] }
      }).lean();

      summary[sec] = {
        totalTests: tests.length,
        availableTests: tests.filter(t => t.status === 'available' || t.isAvailable).length
      };
    }

    return sendSuccess(res, 200, 'CDS Dashboard summary retrieved', {
      module: 'cds',
      sections: summary
    });
  } catch (error) {
    next(error);
  }
};
