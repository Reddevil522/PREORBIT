const PracticeTest = require('../models/PracticeTest');
const TestAttempt = require('../models/TestAttempt');
const { sendSuccess, sendError } = require('../utils/response');

// Import Question Models
const JavaDSAQuestion = require('../models/java-dsa/JavaDSAQuestion');
const AptitudeQuestion = require('../models/aptitude/AptitudeQuestion');
const OOPQuestion = require('../models/core-cs/OOPQuestion');
const DBMSQuestion = require('../models/core-cs/DBMSQuestion');
const OSQuestion = require('../models/core-cs/OSQuestion');
const CNQuestion = require('../models/core-cs/CNQuestion');
const SQLQuestion = require('../models/core-cs/SQLQuestion');

// Helper for Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper to order questions based on saved IDs
function orderQuestions(questions, orderedIds) {
  const qMap = new Map();
  questions.forEach(q => qMap.set(q._id.toString(), q));
  return orderedIds.map(id => qMap.get(id.toString())).filter(Boolean);
}

// Helper to handle attempt question randomization
async function processAttemptQuestions(test, attempt, rawQuestions) {
  const expectedCount = (test.module === 'aptitude') ? 15 : 25;
  if (rawQuestions.length !== expectedCount) {
    throw new Error(`Test must contain exactly ${expectedCount} questions.`);
  }

  let orderedQuestions;

  if (attempt.questionIds && attempt.questionIds.length === expectedCount) {
    orderedQuestions = orderQuestions(rawQuestions, attempt.questionIds);
  } else {
    orderedQuestions = shuffleArray(rawQuestions);
    const shuffledIds = orderedQuestions.map(q => q._id);
    
    const uniqueIds = new Set(shuffledIds.map(id => id.toString()));
    if (uniqueIds.size !== expectedCount) {
       throw new Error('Duplicate questions detected during randomization.');
    }

    attempt.questionIds = shuffledIds;
    await attempt.save();
  }

  return orderedQuestions;
}

async function isTestSequentiallyLocked(test, userId) {
  const chapterTests = await PracticeTest.find({ chapterSlug: test.chapterSlug })
    .select('testId testNumber createdAt')
    .lean();

  if (chapterTests.length === 0) return false;

  chapterTests.sort((a, b) => {
    const numA = a.testNumber || 0;
    const numB = b.testNumber || 0;
    if (numA !== numB) return numA - numB;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  const currentIndex = chapterTests.findIndex(t => t.testId === test.testId);

  // If it's the first test in the sequence, it's never sequentially locked
  if (currentIndex <= 0) return false;

  const previousTest = chapterTests[currentIndex - 1];

  const previousAttempt = await TestAttempt.findOne({
    userId,
    testId: previousTest.testId,
    status: 'submitted',
    submittedAt: { $gte: previousTest.createdAt }
  });

  return !previousAttempt;
}

exports.getAvailableTests = async (req, res, next) => {
  try {
    const { module, subject } = req.query;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    const query = { status: { $in: ['available', 'locked'] } };

    if (module) query.module = String(module);
    if (subject) {
      if (String(module) === 'aptitude') {
        query.section = String(subject);
      } else {
        query.subject = String(subject);
      }
    }

    const tests = await PracticeTest.find(query)
      .select('testId testName module subject section chapterSlug testNumber questionCount multipleChoiceCount mcqCount totalMarks status isAvailable createdAt')
      .sort({ chapterSlug: 1 });

    const submittedAttempts = await TestAttempt.find({ 
      userId, 
      status: 'submitted' 
    }).select('testId submittedAt').lean();

    const completedAttemptsMap = new Map();
    for (const attempt of submittedAttempts) {
       const existing = completedAttemptsMap.get(attempt.testId);
       if (!existing || new Date(attempt.submittedAt) > new Date(existing)) {
          completedAttemptsMap.set(attempt.testId, attempt.submittedAt);
       }
    }

    const chapterTestsMap = new Map();
    for (const test of tests) {
      if (!chapterTestsMap.has(test.chapterSlug)) {
        chapterTestsMap.set(test.chapterSlug, []);
      }
      chapterTestsMap.get(test.chapterSlug).push(test.toObject());
    }

    const processedTests = [];

    for (const [chapterSlug, chapterTests] of chapterTestsMap.entries()) {
      chapterTests.sort((a, b) => {
        const numA = a.testNumber || 0;
        const numB = b.testNumber || 0;
        if (numA !== numB) return numA - numB;
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      let previousCompleted = true;

      for (let i = 0; i < chapterTests.length; i++) {
        const test = chapterTests[i];
        const adminAvailable = test.status === 'available' && test.isAvailable;
        
        const latestAttemptTime = completedAttemptsMap.get(test.testId);
        const isCompleted = !!(latestAttemptTime && new Date(latestAttemptTime) >= new Date(test.createdAt));

        let isLocked = false;
        
        if (!adminAvailable) {
           isLocked = true;
        } else if (i === 0) {
           isLocked = false;
        } else {
           isLocked = !previousCompleted;
        }

        processedTests.push({
          ...test,
          isCompleted,
          isLocked
        });

        previousCompleted = isCompleted;
      }
    }

    return sendSuccess(res, 200, 'Available tests retrieved', processedTests);
  } catch (error) {
    next(error);
  }
};

exports.getTestSummary = async (req, res, next) => {
  try {
    const { module, subject } = req.query;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    const query = {};
    if (module) query.module = String(module);
    if (subject) {
      if (String(module) === 'aptitude') query.section = String(subject);
      else query.subject = String(subject);
    }

    // 1. Get ALL tests for this module/subject (we need them all to determine sequence)
    // We only count tests that are technically available from the admin side towards "availableCount"
    const tests = await PracticeTest.find(query)
      .select('testId chapterSlug testNumber status isAvailable createdAt')
      .lean();

    // 2. Get tests completed by the user with their submittedAt timestamps
    const submittedAttempts = await TestAttempt.find({ 
      userId, 
      status: 'submitted' 
    }).select('testId submittedAt').lean();

    const completedAttemptsMap = new Map();
    for (const attempt of submittedAttempts) {
       const existing = completedAttemptsMap.get(attempt.testId);
       if (!existing || new Date(attempt.submittedAt) > new Date(existing)) {
          completedAttemptsMap.set(attempt.testId, attempt.submittedAt);
       }
    }

    // 3. Group by chapter to evaluate sequential locking
    const chapterTestsMap = new Map();
    for (const test of tests) {
      if (!chapterTestsMap.has(test.chapterSlug)) {
        chapterTestsMap.set(test.chapterSlug, []);
      }
      chapterTestsMap.get(test.chapterSlug).push(test);
    }

    let availableCount = 0;
    let completedCount = 0;

    for (const [chapterSlug, chapterTests] of chapterTestsMap.entries()) {
      // Sort to determine sequence
      chapterTests.sort((a, b) => {
        const numA = a.testNumber || 0;
        const numB = b.testNumber || 0;
        if (numA !== numB) return numA - numB;
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      let previousCompleted = true;

      for (let i = 0; i < chapterTests.length; i++) {
        const test = chapterTests[i];
        const adminAvailable = test.status === 'available' && test.isAvailable;
        
        const latestAttemptTime = completedAttemptsMap.get(test.testId);
        // Completed only if the attempt is not from a deleted/previous version of the test
        const isCompleted = !!(latestAttemptTime && new Date(latestAttemptTime) >= new Date(test.createdAt));

        if (isCompleted) {
           completedCount++;
        }

        let isLocked = false;
        
        if (!adminAvailable) {
           isLocked = true;
        } else if (i === 0) {
           isLocked = false;
        } else {
           isLocked = !previousCompleted;
        }

        if (!isLocked && adminAvailable) {
           availableCount++;
        }

        previousCompleted = isCompleted;
      }
    }

    return sendSuccess(res, 200, 'Test summary retrieved', {
      available: availableCount,
      completed: completedCount
    });
  } catch (error) {
    next(error);
  }
};

exports.getTestMetadata = async (req, res, next) => {
  try {
    const { testId } = req.params;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    const test = await PracticeTest.findOne({ testId }).lean();
    if (!test) {
      return sendError(res, 404, 'Test not found');
    }

    if (test.status !== 'available' || !test.isAvailable) {
      return sendError(res, 403, 'Test is currently unavailable.');
    }

    const isLocked = await isTestSequentiallyLocked(test, userId);
    if (isLocked) {
      return sendError(res, 403, 'Complete the previous test first.');
    }

    return sendSuccess(res, 200, 'Test metadata retrieved', {
      test: {
        testId: test.testId,
        testName: test.testName,
        module: test.module,
        subject: test.subject,
        section: test.section,
        chapterSlug: test.chapterSlug,
        chapterName: test.chapterName,
        questionCount: test.questionCount,
        totalMarks: test.totalMarks,
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.startTest = async (req, res, next) => {
  try {
    const { testId } = req.params;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    // 1. Fetch the test metadata
    const test = await PracticeTest.findOne({ testId });
    if (!test) {
      return sendError(res, 404, 'Test not found');
    }

    // 2. Determine if user has an active attempt for the current test version
    let activeAttempt = await TestAttempt.findOne({ 
      userId, 
      testId, 
      status: 'in-progress',
      startedAt: { $gte: test.createdAt }
    });
    console.log(`[ACTIVE-ATTEMPT] found: ${!!activeAttempt}, attemptId: ${activeAttempt ? activeAttempt.attemptId : 'None'}`);

    if (!activeAttempt) {
      // Validate availability only when starting a NEW attempt
      if (test.status !== 'available' || !test.isAvailable) {
        return sendError(res, 403, 'Test is currently unavailable.');
      }

      const isLocked = await isTestSequentiallyLocked(test, userId);
      if (isLocked) {
        return sendError(res, 403, 'Complete the previous test first.');
      }

      // Create a new attempt
      activeAttempt = await TestAttempt.create({
        userId,
        testId,
        status: 'in-progress',
        answers: {}
      });
    }
    
    console.log(`[ATTEMPT-PERSISTENCE]\nuser: ${userId}\ntestId: ${testId}\nattemptId: ${activeAttempt.attemptId}\nstatus: ${activeAttempt.status}`);

    // 3. Determine the correct Question model
    let QuestionModel;
    if (test.module === 'java-dsa') {
      QuestionModel = JavaDSAQuestion;
    } else if (test.module === 'aptitude') {
      QuestionModel = AptitudeQuestion;
    } else if (test.module === 'core-cs') {
      switch (test.subject) {
        case 'oop': QuestionModel = OOPQuestion; break;
        case 'dbms': QuestionModel = DBMSQuestion; break;
        case 'operating-system': QuestionModel = OSQuestion; break;
        case 'computer-networks': QuestionModel = CNQuestion; break;
        case 'sql': QuestionModel = SQLQuestion; break;
        default:
          return sendError(res, 400, 'Invalid Core CS subject');
      }
    } else {
      return sendError(res, 400, 'Unknown test module');
    }

    // 4. Fetch questions matching the testId
    const rawQuestions = await QuestionModel.find({ testId }).lean();
    
    if (!rawQuestions || rawQuestions.length === 0) {
      return sendError(res, 400, 'This test currently has no questions available.');
    }

    // 4.5. Randomize or order questions based on the attempt
    const orderedQuestions = await processAttemptQuestions(test, activeAttempt, rawQuestions);

    // 5. CRITICAL: Sanitize questions before sending to frontend
    // Remove correctAnswer, correctAnswers, and explanation
    const sanitizedQuestions = orderedQuestions.map(q => {
      const { correctAnswer, correctAnswers, explanation, createdAt, updatedAt, __v, ...safeQuestion } = q;
      return safeQuestion;
    });

    // 6. Return attempt info, metadata and sanitized questions
    return sendSuccess(res, 200, 'Test ready to start', {
      attemptId: activeAttempt.attemptId,
      status: activeAttempt.status,
      startedAt: activeAttempt.startedAt,
      test: {
        testId: test.testId,
        testName: test.testName,
        module: test.module,
        subject: test.subject,
        section: test.section,
        chapterSlug: test.chapterSlug,
        chapterName: test.chapterName,
        questionCount: test.questionCount,
        totalMarks: test.totalMarks,
      },
      questions: sanitizedQuestions
    });

  } catch (error) {
    next(error);
  }
};

exports.submitTest = async (req, res, next) => {
  try {
    const { testId } = req.params;
    let userId = req.user.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    const { attemptId, answers } = req.body;

    if (!attemptId || !Array.isArray(answers)) {
      return sendError(res, 400, 'Invalid submission payload');
    }

    // 1. Fetch the active attempt for this user, test, and attempt ID
    const attempt = await TestAttempt.findOne({ attemptId, testId, userId });
    
    if (!attempt) {
      return sendError(res, 404, 'Test attempt not found or unauthorized');
    }

    if (attempt.status === 'submitted') {
      console.log(`[EVALUATION-FINAL]\nduplicate submission detected`);
      console.log(`[EVALUATION-RECOVERY]\nexistingSubmittedAttempt: true`);
      return sendSuccess(res, 200, 'Test already submitted', {
        attemptId: attempt.attemptId,
        status: attempt.status,
        submittedAt: attempt.submittedAt,
        result: attempt.evaluation
      });
    }

    const statusBefore = attempt.status;

    // 2. Fetch test metadata to determine Question model
    const test = await PracticeTest.findOne({ testId });
    if (!test) {
      return sendError(res, 404, 'Test not found');
    }

    let QuestionModel;
    if (test.module === 'java-dsa') QuestionModel = JavaDSAQuestion;
    else if (test.module === 'aptitude') QuestionModel = AptitudeQuestion;
    else if (test.module === 'core-cs') {
      switch (test.subject) {
        case 'oop': QuestionModel = OOPQuestion; break;
        case 'dbms': QuestionModel = DBMSQuestion; break;
        case 'operating-system': QuestionModel = OSQuestion; break;
        case 'computer-networks': QuestionModel = CNQuestion; break;
        case 'sql': QuestionModel = SQLQuestion; break;
        default: return sendError(res, 400, 'Invalid Core CS subject');
      }
    } else {
      return sendError(res, 400, 'Unknown test module');
    }

    // 3. Load all questions for this test to validate answers
    const validQuestions = await QuestionModel.find({ testId }).lean();
    const validQuestionMap = new Map();
    validQuestions.forEach(q => {
      validQuestionMap.set(q._id.toString(), q);
    });

    // 4. Validate submitted answers
    const validatedAnswers = new Map();

    for (const ans of answers) {
      const { questionId, selectedAnswer } = ans;
      
      // Ensure question belongs to test
      if (!validQuestionMap.has(questionId)) {
        return sendError(res, 400, `Invalid question submitted: ${questionId}`);
      }

      const question = validQuestionMap.get(questionId);
      const validOptions = question.options.map(o => o.key);

      // Validate option(s) exist in question
      if (Array.isArray(selectedAnswer)) {
        const allValid = selectedAnswer.every(opt => validOptions.includes(opt));
        if (!allValid) return sendError(res, 400, `Invalid option selected for question: ${questionId}`);
      } else {
        if (selectedAnswer && !validOptions.includes(selectedAnswer)) {
          return sendError(res, 400, `Invalid option selected for question: ${questionId}`);
        }
      }

      // If empty array, don't store it, treat as unattempted
      if (selectedAnswer === null || selectedAnswer === undefined || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0) || selectedAnswer === '') {
        // Skip
      } else {
        validatedAnswers.set(questionId, selectedAnswer);
      }
    }

    // 5. Calculate Evaluation
    const attemptQuestionIds = attempt.questionIds || [];
    const evaluatedQuestionIds = attemptQuestionIds.length > 0 
      ? attemptQuestionIds.map(id => id.toString()) 
      : validQuestions.map(q => q._id.toString());

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let obtainedMarks = 0;
    const maximumMarks = evaluatedQuestionIds.length;

    for (const qId of evaluatedQuestionIds) {
      const question = validQuestionMap.get(qId);
      if (!question) {
        return sendError(res, 500, `Question referenced in attempt not found: ${qId}`);
      }

      const studentAnswer = validatedAnswers.get(qId);

      if (studentAnswer === undefined) {
        unattemptedCount++;
      } else {
        let isCorrect = false;

        if (question.questionType === 'mcq') {
          if (typeof studentAnswer === 'string' && studentAnswer.trim() === question.correctAnswer.trim()) {
            isCorrect = true;
          }
        } else if (question.questionType === 'multiple-choice') {
          if (Array.isArray(studentAnswer) && Array.isArray(question.correctAnswers)) {
            const sortedStudent = [...studentAnswer].map(a => a.trim()).sort();
            const sortedCorrect = [...question.correctAnswers].map(a => a.trim()).sort();
            
            if (sortedStudent.length === sortedCorrect.length && sortedStudent.every((val, index) => val === sortedCorrect[index])) {
              isCorrect = true;
            }
          }
        }

        if (isCorrect) {
          correctCount++;
          obtainedMarks += 1;
        } else {
          incorrectCount++;
        }
      }
    }

    const percentage = maximumMarks > 0 ? Math.round((obtainedMarks / maximumMarks) * 100) : 0;
    const attemptedCount = correctCount + incorrectCount;

    // 6. Atomic Update
    attempt.answers = validatedAnswers;
    attempt.status = 'submitted';
    attempt.submittedAt = new Date();
    attempt.evaluation = {
      totalQuestions: maximumMarks,
      attempted: attemptedCount,
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
      obtainedMarks,
      maximumMarks,
      percentage
    };
    
    await attempt.save();

    console.log(`[EVALUATION-FINAL]\nattemptId: ${attempt.attemptId}`);
    console.log(`[EVALUATION-FINAL]\nquestionCount: ${maximumMarks}`);
    console.log(`[EVALUATION-FINAL]\ncorrect: ${correctCount}`);
    console.log(`[EVALUATION-FINAL]\nincorrect: ${incorrectCount}`);
    console.log(`[EVALUATION-FINAL]\nunattempted: ${unattemptedCount}`);
    console.log(`[EVALUATION-FINAL]\nobtainedMarks: ${obtainedMarks}`);
    console.log(`[EVALUATION-FINAL]\nmaximumMarks: ${maximumMarks}`);
    console.log(`[EVALUATION-FINAL]\npercentage: ${percentage}`);
    console.log(`[EVALUATION-FINAL]\nstatus: submitted`);

    // 7. Response
    return sendSuccess(res, 200, 'Test submitted successfully', {
      attemptId: attempt.attemptId,
      status: attempt.status,
      submittedAt: attempt.submittedAt,
      result: attempt.evaluation
    });

  } catch (error) {
    next(error);
  }
};

exports.resumeTest = async (req, res, next) => {
  try {
    const { testId } = req.params;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    const test = await PracticeTest.findOne({ testId });
    if (!test) return sendError(res, 404, 'Test not found');

    // Find the latest attempt that belongs to the current test version
    const activeAttempt = await TestAttempt.findOne({ 
      userId, 
      testId,
      startedAt: { $gte: test.createdAt }
    }).sort({ createdAt: -1 });
    console.log(`[ACTIVE-ATTEMPT] found: ${!!activeAttempt}, attemptId: ${activeAttempt ? activeAttempt.attemptId : 'None'}`);
    
    if (!activeAttempt) {
      return sendError(res, 404, 'No attempt found');
    }
    
    console.log(`[ATTEMPT-PERSISTENCE]\nuser: ${userId}\ntestId: ${testId}\nattemptId: ${activeAttempt.attemptId}\nstatus: ${activeAttempt.status}`);

    let QuestionModel;
    if (test.module === 'java-dsa') QuestionModel = JavaDSAQuestion;
    else if (test.module === 'aptitude') QuestionModel = AptitudeQuestion;
    else if (test.module === 'core-cs') {
      switch (test.subject) {
        case 'oop': QuestionModel = OOPQuestion; break;
        case 'dbms': QuestionModel = DBMSQuestion; break;
        case 'operating-system': QuestionModel = OSQuestion; break;
        case 'computer-networks': QuestionModel = CNQuestion; break;
        case 'sql': QuestionModel = SQLQuestion; break;
        default: return sendError(res, 400, 'Invalid Core CS subject');
      }
    } else return sendError(res, 400, 'Unknown test module');

    const rawQuestions = await QuestionModel.find({ testId }).lean();
    const orderedQuestions = await processAttemptQuestions(test, activeAttempt, rawQuestions);
    const sanitizedQuestions = orderedQuestions.map(q => {
      const { correctAnswer, correctAnswers, explanation, createdAt, updatedAt, __v, ...safeQuestion } = q;
      return safeQuestion;
    });

    console.log(`[EVALUATION-RECOVERY]\nattemptId: ${activeAttempt.attemptId}\nstatus: ${activeAttempt.status}`);
    
    let savedResultFound = false;
    let obtainedMarks, maximumMarks, percentage;
    if (activeAttempt.status === 'submitted' && activeAttempt.evaluation) {
      savedResultFound = true;
      obtainedMarks = activeAttempt.evaluation.obtainedMarks;
      maximumMarks = activeAttempt.evaluation.maximumMarks;
      percentage = activeAttempt.evaluation.percentage;
    }
    
    console.log(`[EVALUATION-RECOVERY]\nsavedResultFound: ${savedResultFound}`);
    if (savedResultFound) {
       console.log(`[EVALUATION-RECOVERY]\nobtainedMarks: ${obtainedMarks}\nmaximumMarks: ${maximumMarks}\npercentage: ${percentage}`);
    }

    return sendSuccess(res, 200, 'Test resumed successfully', {
      attemptId: activeAttempt.attemptId,
      status: activeAttempt.status,
      startedAt: activeAttempt.startedAt,
      answers: activeAttempt.answers || {},
      result: activeAttempt.evaluation || null,
      test: {
        testId: test.testId,
        testName: test.testName,
        module: test.module,
        subject: test.subject,
        section: test.section,
        chapterSlug: test.chapterSlug,
        chapterName: test.chapterName,
        questionCount: test.questionCount,
        totalMarks: test.totalMarks,
      },
      questions: sanitizedQuestions
    });
  } catch (error) {
    next(error);
  }
};

exports.saveAnswer = async (req, res, next) => {
  try {
    const { testId, attemptId } = req.params;
    const { questionId, selectedAnswer } = req.body;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    if (!questionId) return sendError(res, 400, 'Question ID is required');

    const attempt = await TestAttempt.findOne({ attemptId, testId, userId });
    if (!attempt) return sendError(res, 404, 'Test attempt not found or unauthorized');
    if (attempt.status === 'submitted') return sendError(res, 409, 'Test already submitted');

    const test = await PracticeTest.findOne({ testId });
    if (!test) return sendError(res, 404, 'Test not found');

    let QuestionModel;
    if (test.module === 'java-dsa') QuestionModel = JavaDSAQuestion;
    else if (test.module === 'aptitude') QuestionModel = AptitudeQuestion;
    else if (test.module === 'core-cs') {
      switch (test.subject) {
        case 'oop': QuestionModel = OOPQuestion; break;
        case 'dbms': QuestionModel = DBMSQuestion; break;
        case 'operating-system': QuestionModel = OSQuestion; break;
        case 'computer-networks': QuestionModel = CNQuestion; break;
        case 'sql': QuestionModel = SQLQuestion; break;
        default: return sendError(res, 400, 'Invalid Core CS subject');
      }
    } else return sendError(res, 400, 'Unknown test module');

    const question = await QuestionModel.findOne({ _id: questionId, testId }).lean();
    if (!question) return sendError(res, 400, 'Invalid question submitted');

    const validOptions = question.options.map(o => o.key);

    if (Array.isArray(selectedAnswer)) {
      const allValid = selectedAnswer.every(opt => validOptions.includes(opt));
      if (!allValid) return sendError(res, 400, 'Invalid option selected');
    } else {
      if (selectedAnswer && !validOptions.includes(selectedAnswer)) {
        return sendError(res, 400, 'Invalid option selected');
      }
    }

    // Attempt answers is a Mongoose Map
    if (selectedAnswer === null || selectedAnswer === undefined || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) {
       attempt.answers.delete(questionId);
    } else {
       attempt.answers.set(questionId, selectedAnswer);
    }
    
    await attempt.save();

    return sendSuccess(res, 200, 'Answer saved successfully');
  } catch (error) {
    next(error);
  }
};

exports.retakeTest = async (req, res, next) => {
  try {
    const { testId } = req.params;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return sendError(res, 400, 'Invalid authenticated user identity');
    }

    // 1. Fetch the test metadata
    const test = await PracticeTest.findOne({ testId });
    if (!test) {
      return sendError(res, 404, 'Test not found');
    }

    if (test.status !== 'available' || !test.isAvailable) {
      return sendError(res, 403, 'Test is currently unavailable.');
    }

    // 2. Check for an active in-progress attempt to prevent duplicate creation
    const activeAttempt = await TestAttempt.findOne({ 
      userId, 
      testId, 
      status: 'in-progress',
      startedAt: { $gte: test.createdAt }
    });
    console.log(`[ACTIVE-ATTEMPT] found: ${!!activeAttempt}, attemptId: ${activeAttempt ? activeAttempt.attemptId : 'None'}`);
    console.log(`[RETAKE-DUPLICATE] existingActiveAttempt: ${activeAttempt ? activeAttempt.attemptId : 'None'}`);
    let attemptToReturn = activeAttempt;

    if (!activeAttempt) {
      // 3. Ensure they have a submitted attempt before allowing a retake
      const submittedAttempt = await TestAttempt.findOne({ 
        userId, 
        testId, 
        status: 'submitted',
        submittedAt: { $gte: test.createdAt }
      });
      if (!submittedAttempt) {
         return sendError(res, 400, 'Cannot retake a test that has not been submitted.');
      }

      // 4. Create a new attempt
      attemptToReturn = await TestAttempt.create({
        userId,
        testId,
        status: 'in-progress',
        answers: {}
      });
      console.log(`[RETAKE-NEW]\noldAttemptId: ${submittedAttempt.attemptId}\nnewAttemptId: ${attemptToReturn.attemptId}`);
    }
    
    console.log(`[ATTEMPT-PERSISTENCE]\nuser: ${userId}\ntestId: ${testId}\nattemptId: ${attemptToReturn.attemptId}\nstatus: ${attemptToReturn.status}`);

    // 5. Determine the correct Question model
    let QuestionModel;
    if (test.module === 'java-dsa') {
      QuestionModel = JavaDSAQuestion;
    } else if (test.module === 'aptitude') {
      QuestionModel = AptitudeQuestion;
    } else if (test.module === 'core-cs') {
      switch (test.subject) {
        case 'oop': QuestionModel = OOPQuestion; break;
        case 'dbms': QuestionModel = DBMSQuestion; break;
        case 'operating-system': QuestionModel = OSQuestion; break;
        case 'computer-networks': QuestionModel = CNQuestion; break;
        case 'sql': QuestionModel = SQLQuestion; break;
        default:
          return sendError(res, 400, 'Invalid Core CS subject');
      }
    } else {
      return sendError(res, 400, 'Unknown test module');
    }

    // 6. Fetch questions matching the testId
    const rawQuestions = await QuestionModel.find({ testId }).lean();
    
    if (!rawQuestions || rawQuestions.length === 0) {
      return sendError(res, 400, 'This test currently has no questions available.');
    }
    
    const orderedQuestions = await processAttemptQuestions(test, attemptToReturn, rawQuestions);
    const sanitizedQuestions = orderedQuestions.map(q => {
      const { correctAnswer, correctAnswers, explanation, createdAt, updatedAt, __v, ...safeQuestion } = q;
      return safeQuestion;
    });

    // 7. Return new attempt info
    return sendSuccess(res, 200, 'Retake started successfully', {
      attemptId: attemptToReturn.attemptId,
      status: attemptToReturn.status,
      startedAt: attemptToReturn.startedAt,
      test: {
        testId: test.testId,
        testName: test.testName,
        module: test.module,
        subject: test.subject,
        section: test.section,
        chapterSlug: test.chapterSlug,
        chapterName: test.chapterName,
        questionCount: test.questionCount,
        totalMarks: test.totalMarks,
      },
      questions: sanitizedQuestions
    });

  } catch (error) {
    next(error);
  }
};

exports.getTestResult = async (req, res, next) => {
  try {
    const { attemptId } = req.params;
    let userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
       return sendError(res, 400, 'Invalid authenticated user identity');
    }

    const attempt = await TestAttempt.findOne({ attemptId, userId });
    if (!attempt) {
      return sendError(res, 404, 'Test attempt not found or unauthorized');
    }

    if (attempt.status !== 'submitted') {
      return sendError(res, 403, 'Test result is only available for submitted tests');
    }

    const test = await PracticeTest.findOne({ testId: attempt.testId });
    if (!test) {
      return sendError(res, 404, 'Associated test not found');
    }

    let QuestionModel;
    if (test.module === 'java-dsa') QuestionModel = JavaDSAQuestion;
    else if (test.module === 'aptitude') QuestionModel = AptitudeQuestion;
    else if (test.module === 'core-cs') {
      switch (test.subject) {
        case 'oop': QuestionModel = OOPQuestion; break;
        case 'dbms': QuestionModel = DBMSQuestion; break;
        case 'operating-system': QuestionModel = OSQuestion; break;
        case 'computer-networks': QuestionModel = CNQuestion; break;
        case 'sql': QuestionModel = SQLQuestion; break;
        default: return sendError(res, 400, 'Invalid Core CS subject');
      }
    } else {
      return sendError(res, 400, 'Unknown test module');
    }

    const rawQuestions = await QuestionModel.find({ testId: attempt.testId }).lean();
    const questionMap = new Map();
    rawQuestions.forEach(q => questionMap.set(q._id.toString(), q));

    const questionAnalysis = [];
    let qNumber = 1;

    for (const qId of attempt.questionIds) {
      const q = questionMap.get(qId.toString());
      if (!q) continue;

      const studentAnswer = attempt.answers.get(qId.toString());
      const isMultipleChoice = q.questionType === 'multiple-choice';
      
      let status = 'Unattempted';
      let marks = 0;
      let isAnswered = false;

      if (studentAnswer !== undefined && studentAnswer !== null) {
         if (Array.isArray(studentAnswer)) {
             isAnswered = studentAnswer.length > 0;
         } else {
             isAnswered = String(studentAnswer).trim().length > 0;
         }
      }

      if (isAnswered) {
        let isCorrect = false;
        if (isMultipleChoice) {
           const correctArr = q.correctAnswers || [];
           const studentArr = Array.isArray(studentAnswer) ? studentAnswer : [studentAnswer];
           
           if (studentArr.length === correctArr.length && studentArr.every(val => correctArr.includes(val))) {
               isCorrect = true;
           }
        } else {
           if (studentAnswer === q.correctAnswer) {
               isCorrect = true;
           }
        }
        
        if (isCorrect) {
           status = 'Correct';
           marks = 1;
        } else {
           status = 'Incorrect';
        }
      }

      questionAnalysis.push({
         questionNumber: qNumber++,
         questionId: q._id.toString(),
         question: q.question,
         options: q.options,
         questionType: q.questionType || 'mcq',
         studentAnswer: studentAnswer,
         correctAnswer: isMultipleChoice ? (q.correctAnswers || []) : q.correctAnswer,
         status,
         marks,
         explanation: q.explanation || null
      });
    }

    return sendSuccess(res, 200, 'Test result fetched successfully', {
      attemptId: attempt.attemptId,
      status: attempt.status,
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      test: {
        testId: test.testId,
        testName: test.testName,
        module: test.module,
        subject: test.subject,
        section: test.section,
        chapterSlug: test.chapterSlug,
        chapterName: test.chapterName,
        questionCount: test.questionCount,
        totalMarks: test.totalMarks,
      },
      evaluation: attempt.evaluation,
      questionAnalysis
    });

  } catch (error) {
    next(error);
  }
};
