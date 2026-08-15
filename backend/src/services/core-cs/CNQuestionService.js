const CNQuestion = require('../../models/core-cs/CNQuestion');

class CNQuestionService {
  // For user test taking - excludes correct answers
  async getQuestionsForTest(chapterSlug, testId) {
    return await CNQuestion.find(
      { chapterSlug, testId },
      { correctAnswer: 0, correctAnswers: 0, explanation: 0 }
    );
  }

  // For evaluation or admin
  async getQuestionsByTest(chapterSlug, testId) {
    return await CNQuestion.find({ chapterSlug, testId });
  }

  // Admin only - Get single question
  async getQuestionById(id) {
    return await CNQuestion.findById(id);
  }

  // Admin only - Create
  async createQuestion(data) {
    const existing = await CNQuestion.findOne({
      chapterSlug: data.chapterSlug,
      testId: data.testId,
      question: data.question
    });
    
    if (existing) {
      throw new Error('Question already exists in this test');
    }

    if (data.marks === undefined) data.marks = 1;
    const question = new CNQuestion(data);
    return await question.save();
  }

  // Admin only - Update
  async updateQuestion(id, data) {
    return await CNQuestion.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  // Admin only - Delete
  async deleteQuestion(id) {
    return await CNQuestion.findByIdAndDelete(id);
  }
}

module.exports = new CNQuestionService();
