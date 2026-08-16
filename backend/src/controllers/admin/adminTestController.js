const PracticeTest = require('../../models/PracticeTest');
const { sendSuccess, sendError } = require('../../utils/response');
const TestStatusService = require('../../services/admin/TestStatusService');
const mongoose = require('mongoose');

exports.getTests = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      module, 
      subject, 
      status, 
      sort = 'newest' 
    } = req.query;

    const query = {};

    // Filters (Cast to string to prevent object operator injection)
    if (module) query.module = String(module);
    if (subject) {
      if (String(module) === 'aptitude') {
        query.section = String(subject);
      } else {
        query.subject = String(subject);
      }
    }
    if (status) query.status = String(status);

    // Search
    if (search) {
      const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const searchRegex = new RegExp(escapeRegex(String(search)), 'i');
      query.$or = [
        { testId: searchRegex },
        { testName: searchRegex },
        { chapterSlug: searchRegex },
        { subject: searchRegex },
        { section: searchRegex },
        { module: searchRegex }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    switch (sort) {
      case 'oldest': sortOption = { createdAt: 1 }; break;
      case 'newest': sortOption = { createdAt: -1 }; break;
      case 'questionCount': sortOption = { questionCount: -1 }; break;
      case 'alphabetical': sortOption = { testName: 1 }; break;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [tests, total] = await Promise.all([
      PracticeTest.find(query)
        .select('testId testName module subject section chapterSlug testNumber questionCount totalMarks status isAvailable createdAt updatedAt configuration')
        .sort(sortOption)
        .skip(skip)
        .limit(parseInt(limit) || 0)
        .lean(),
      PracticeTest.countDocuments(query)
    ]);

    return sendSuccess(res, 200, 'Tests retrieved successfully', {
      tests,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    next(error);
  }
};

exports.getTestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const test = await PracticeTest.findById(id)
      .select('testId testName module subject section chapterSlug testNumber questionCount totalMarks status isAvailable createdAt updatedAt configuration')
      .lean();
      
    if (!test) {
      return sendError(res, 404, 'Unable to load test details.');
    }

    // Resolve the question model to fetch actual questions
    const Model = TestStatusService.getModel(test.module, test.subject || test.section);
    
    if (!Model) {
      return sendError(res, 500, 'Invalid module configuration in test document.');
    }

    // Fetch questions
    const questionQuery = { chapterSlug: test.chapterSlug, testId: test.testId };
    if (test.module === 'aptitude') {
      questionQuery.section = test.section;
    }

    const questions = await Model.find(questionQuery)
      .select('question options questionType correctAnswer correctAnswers marks explanation')
      .lean();

    return sendSuccess(res, 200, 'Test details retrieved successfully', {
      test,
      questions
    });

  } catch (error) {
    if (error.kind === 'ObjectId') {
      return sendError(res, 404, 'Unable to load test details.');
    }
    next(error);
  }
};

exports.deleteTest = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    // 1. Find the test metadata
    const test = await PracticeTest.findById(id).session(session);
    if (!test) {
      await session.abortTransaction();
      session.endSession();
      return sendError(res, 404, 'Test not found.');
    }

    // 2. Resolve the correct Question model
    const Model = TestStatusService.getModel(test.module, test.subject || test.section);
    if (!Model) {
      await session.abortTransaction();
      session.endSession();
      return sendError(res, 500, 'Invalid module configuration in test document.');
    }

    // 3. Build query to delete associated questions
    const questionQuery = { chapterSlug: test.chapterSlug, testId: test.testId };
    if (test.module === 'aptitude') {
      questionQuery.section = test.section;
    }

    // 4. Delete questions
    await Model.deleteMany(questionQuery).session(session);

    // 5. Delete test metadata
    await PracticeTest.findByIdAndDelete(id).session(session);

    // 6. Commit transaction
    await session.commitTransaction();
    session.endSession();

    return sendSuccess(res, 200, 'Test deleted successfully.');
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error.kind === 'ObjectId') {
      return sendError(res, 404, 'Test not found.');
    }
    next(error);
  }
};

exports.updateTestConfiguration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const test = await PracticeTest.findById(id);
    if (!test) {
       return sendError(res, 404, 'Test not found.');
    }
    
    // Validate configuration
    if (updates.configuration) {
       const conf = updates.configuration;
       if (conf.totalQuestions !== undefined && conf.totalQuestions !== test.questionCount) {
          return sendError(res, 400, `Validation Failed: Configuration totalQuestions mismatch. Actual questions: ${test.questionCount}`);
       }
       test.configuration = { ...test.configuration, ...conf };
       test.markModified('configuration');
    }
    
    if (updates.status) test.status = updates.status;
    if (updates.isAvailable !== undefined) test.isAvailable = updates.isAvailable;
    
    await test.save();
    
    return sendSuccess(res, 200, 'Test configuration updated successfully', { test });
  } catch (error) {
    next(error);
  }
};

exports.updateTestAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;
    
    if (typeof isAvailable !== 'boolean') {
      return sendError(res, 400, 'isAvailable must be a boolean.');
    }

    const test = await PracticeTest.findById(id);
    if (!test) {
       return sendError(res, 404, 'Test not found.');
    }
    
    // Check if test is valid
    if (test.status === 'incomplete' || test.status === 'draft') {
      return sendError(res, 400, 'Test is incomplete and cannot be made available.');
    }

    test.isAvailable = isAvailable;
    test.status = isAvailable ? 'available' : 'locked';
    
    await test.save();
    
    return sendSuccess(res, 200, 'Test availability updated successfully', { test });
  } catch (error) {
    next(error);
  }
};
