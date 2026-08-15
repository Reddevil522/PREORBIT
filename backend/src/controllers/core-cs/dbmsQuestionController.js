const DBMSQuestionService = require('../../services/core-cs/DBMSQuestionService');
const { sendSuccess, sendError } = require('../../utils/response');

exports.getQuestionsForTest = async (req, res, next) => {
  try {
    const { chapterSlug, testId } = req.params;
    const questions = await DBMSQuestionService.getQuestionsForTest(chapterSlug, testId);
    return sendSuccess(res, 200, 'Questions retrieved successfully', { count: questions.length, questions });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionsByTestAdmin = async (req, res, next) => {
  try {
    const { chapterSlug, testId } = req.params;
    const questions = await DBMSQuestionService.getQuestionsByTest(chapterSlug, testId);
    return sendSuccess(res, 200, 'Questions retrieved successfully (Admin)', { count: questions.length, questions });
  } catch (error) {
    next(error);
  }
};

exports.getQuestionById = async (req, res, next) => {
  try {
    const question = await DBMSQuestionService.getQuestionById(req.params.id);
    if (!question) return sendError(res, 404, 'Question not found');
    return sendSuccess(res, 200, 'Question retrieved', { question });
  } catch (error) {
    next(error);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const question = await DBMSQuestionService.createQuestion(req.body);
    return sendSuccess(res, 201, 'Question created successfully', { question });
  } catch (error) {
    if (error.message === 'Question already exists in this test') {
      return sendError(res, 409, error.message);
    }
    next(error);
  }
};

exports.updateQuestion = async (req, res, next) => {
  try {
    const question = await DBMSQuestionService.updateQuestion(req.params.id, req.body);
    if (!question) return sendError(res, 404, 'Question not found');
    return sendSuccess(res, 200, 'Question updated successfully', { question });
  } catch (error) {
    next(error);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await DBMSQuestionService.deleteQuestion(req.params.id);
    if (!question) return sendError(res, 404, 'Question not found');
    return sendSuccess(res, 200, 'Question deleted successfully');
  } catch (error) {
    next(error);
  }
};
