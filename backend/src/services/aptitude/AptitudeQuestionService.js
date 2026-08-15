const AptitudeQuestion = require('../../models/aptitude/AptitudeQuestion');

class AptitudeQuestionService {
  // For user test taking - excludes correct answers
  async getQuestionsForTest(section, chapterSlug, testId) {
    return await AptitudeQuestion.find(
      { section, chapterSlug, testId },
      { correctAnswer: 0, explanation: 0 }
    );
  }

  // For evaluation or admin
  async getQuestionsByTest(section, chapterSlug, testId) {
    return await AptitudeQuestion.find({ section, chapterSlug, testId });
  }

  // Admin only - Get single question
  async getQuestionById(id) {
    return await AptitudeQuestion.findById(id);
  }

  // Admin only - Create
  async createQuestion(data) {
    // Basic duplicate prevention stub (Phase 9 will expand this with JSON importer)
    const existing = await AptitudeQuestion.findOne({
      section: data.section,
      chapterSlug: data.chapterSlug,
      testId: data.testId,
      question: data.question
    });
    
    if (existing) {
      throw new Error('Question already exists in this test');
    }

    if (data.marks === undefined) data.marks = 1;
    const question = new AptitudeQuestion(data);
    return await question.save();
  }

  // Admin only - Update
  async updateQuestion(id, data) {
    return await AptitudeQuestion.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  // Admin only - Delete
  async deleteQuestion(id) {
    return await AptitudeQuestion.findByIdAndDelete(id);
  }
}

module.exports = new AptitudeQuestionService();
