const OSQuestion = require('../../models/core-cs/OSQuestion');

class OSQuestionService {
  // For user test taking - excludes correct answers
  async getQuestionsForTest(chapterSlug, testId) {
    return await OSQuestion.find(
      { chapterSlug, testId },
      { correctAnswer: 0, correctAnswers: 0, explanation: 0 }
    );
  }

  // For evaluation or admin
  async getQuestionsByTest(chapterSlug, testId) {
    return await OSQuestion.find({ chapterSlug, testId });
  }

  // Admin only - Get single question
  async getQuestionById(id) {
    return await OSQuestion.findById(id);
  }

  // Admin only - Create
  async createQuestion(data) {
    const existing = await OSQuestion.findOne({
      chapterSlug: data.chapterSlug,
      testId: data.testId,
      question: data.question
    });
    
    if (existing) {
      throw new Error('Question already exists in this test');
    }

    if (data.marks === undefined) data.marks = 1;
    const question = new OSQuestion(data);
    return await question.save();
  }

  // Admin only - Update
  async updateQuestion(id, data) {
    return await OSQuestion.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  // Admin only - Delete
  async deleteQuestion(id) {
    return await OSQuestion.findByIdAndDelete(id);
  }
}

module.exports = new OSQuestionService();
