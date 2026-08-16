const mongoose = require('mongoose');
const PracticeTest = require('../models/PracticeTest');
const ImportHistory = require('../models/admin/ImportHistory');
const { sendSuccess } = require('../utils/response');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalModules = (await PracticeTest.distinct('module')).length;
    
    // Subjects/Sections might be empty string or null, so we filter them out
    const totalSubjectsAgg = await PracticeTest.aggregate([
      { 
        $project: { 
          topic: { $cond: [ { $and: [ { $ne: ["$subject", ""] }, { $ne: ["$subject", null] } ] }, "$subject", "$section" ] } 
        } 
      },
      { $match: { topic: { $ne: null }, topic: { $ne: "" } } },
      { $group: { _id: "$topic" } }
    ]);
    const totalSubjects = totalSubjectsAgg.length;
    
    const totalChapters = (await PracticeTest.distinct('chapterSlug')).length;

    const totalTests = await PracticeTest.countDocuments();
    const testsWithQuestions = await PracticeTest.countDocuments({ questionCount: { $gt: 0 } });
    const testsWithoutQuestions = await PracticeTest.countDocuments({ questionCount: 0 });

    const totalQuestionsAgg = await PracticeTest.aggregate([
      { $group: { _id: null, totalQuestions: { $sum: '$questionCount' } } }
    ]);
    const totalQuestions = totalQuestionsAgg.length > 0 ? totalQuestionsAgg[0].totalQuestions : 0;

    const recentUploads = await ImportHistory.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    sendSuccess(res, 200, 'Admin dashboard stats retrieved successfully', {
      totalModules,
      totalSubjects,
      totalChapters,
      totalTests,
      testsWithQuestions,
      testsWithoutQuestions,
      totalQuestions,
      recentUploads
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Unable to load admin dashboard stats.' });
  }
};
