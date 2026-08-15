const JavaDSAQuestion = require('../../models/java-dsa/JavaDSAQuestion');

class JavaDSAQuestionService {
  // For user test taking - excludes correct answers
  async getQuestionsForTest(chapterSlug, testId) {
    return await JavaDSAQuestion.find(
      { chapterSlug, testId },
      { correctAnswer: 0, correctAnswers: 0, explanation: 0 }
    );
  }

  // For evaluation or admin
  async getQuestionsByTest(chapterSlug, testId) {
    return await JavaDSAQuestion.find({ chapterSlug, testId });
  }

  // Admin only - Get single question
  async getQuestionById(id) {
    return await JavaDSAQuestion.findById(id);
  }

  // Admin only - Create
  async createQuestion(data) {
    // Basic duplicate prevention stub (Phase 9 will expand this with JSON importer)
    const existing = await JavaDSAQuestion.findOne({
      chapterSlug: data.chapterSlug,
      testId: data.testId,
      question: data.question
    });
    
    if (existing) {
      throw new Error('Question already exists in this test');
    }

    if (data.marks === undefined) data.marks = 1;
    const question = new JavaDSAQuestion(data);
    return await question.save();
  }

  // Admin only - Update
  async updateQuestion(id, data) {
    return await JavaDSAQuestion.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  // Admin only - Delete
  async deleteQuestion(id) {
    return await JavaDSAQuestion.findByIdAndDelete(id);
  }
}

module.exports = new JavaDSAQuestionService();
