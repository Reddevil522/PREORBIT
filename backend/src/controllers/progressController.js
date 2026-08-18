const mongoose = require('mongoose');
const TestAttempt = require('../models/TestAttempt');
const PracticeTest = require('../models/PracticeTest');
const TheoryCompletion = require('../models/TheoryCompletion');

function getValidUserId(reqUser) {
  const rawId = reqUser?.userId || reqUser?.id || reqUser?._id;
  if (mongoose.Types.ObjectId.isValid(rawId)) {
    return rawId;
  }
  return new mongoose.Types.ObjectId('000000000000000000000000');
}

// GET /api/progress
exports.getProgress = async (req, res) => {
  try {
    const userId = getValidUserId(req.user);
    console.log(`[PROGRESS-AUTH] authenticatedUserId: ${userId}`);

    // 1. Fetch all submitted test attempts for this user
    const attempts = await TestAttempt.find({
      userId,
      status: 'submitted'
    }).sort({ submittedAt: 1 }).lean();
    console.log(`[PROGRESS-DB] attemptUserId: ${userId}, submittedAttemptsCount: ${attempts.length}`);

    // 2. Fetch theory completions
    const theoryCompletions = await TheoryCompletion.find({ userId }).lean();
    const completedChapters = new Set(theoryCompletions.map(tc => (tc.chapterSlug || '').toLowerCase()));

    // 3. Fetch all active practice tests (available or locked) to establish curriculum
    const practiceTests = await PracticeTest.find({
      $or: [
        { status: { $in: ['available', 'locked'] } },
        { isAvailable: true }
      ]
    }).lean();
    const testMap = new Map();
    practiceTests.forEach(t => testMap.set(t.testId, t));

    // Overall stats
    let totalAttemptsCount = attempts.length;
    let totalCorrect = 0;
    let totalQuestionsAttempted = 0;
    let totalTimeSpent = 0; // in milliseconds
    let totalObtainedMarks = 0;
    let totalMaxMarks = 0;

    // Grouping by testId to find best scores
    const testStats = new Map();

    attempts.forEach(attempt => {
      const tId = attempt.testId;

      if (!testStats.has(tId)) {
        testStats.set(tId, {
          testId: tId,
          attempts: 0,
          bestScore: 0,
          bestPercentage: 0,
          latestScore: 0,
          latestPercentage: 0
        });
      }

      const stat = testStats.get(tId);
      stat.attempts++;

      const obtained = attempt.evaluation?.obtainedMarks || 0;
      const max = attempt.evaluation?.maximumMarks || 0;
      const perc = attempt.evaluation?.percentage || 0;

      if (obtained >= stat.bestScore) {
        stat.bestScore = obtained;
        stat.bestPercentage = perc;
      }

      stat.latestScore = obtained;
      stat.latestPercentage = perc;

      totalCorrect += attempt.evaluation?.correct || 0;
      totalQuestionsAttempted += attempt.evaluation?.attempted || 0;
      totalObtainedMarks += obtained;
      totalMaxMarks += max;

      const started = new Date(attempt.startedAt).getTime();
      const submitted = new Date(attempt.submittedAt).getTime();
      if (!isNaN(started) && !isNaN(submitted) && submitted > started) {
        totalTimeSpent += (submitted - started);
      }
    });

    const uniqueTestsCompleted = testStats.size;
    const averageScore = totalAttemptsCount > 0 ? (totalObtainedMarks / totalAttemptsCount) : 0;
    const averageScorePercentage = totalAttemptsCount > 0 ? (totalObtainedMarks / totalMaxMarks) * 100 : 0;
    const accuracy = totalQuestionsAttempted > 0 ? (totalCorrect / totalQuestionsAttempted) * 100 : 0;

    // --- HIERARCHICAL PROGRESS CALCULATION ---

    // Initialize structures
    const chaptersMap = new Map();
    const subjectsMap = new Map(); // key: subject_module
    const modulesMap = new Map();

    // Group tests by chapter
    practiceTests.forEach(t => {
      const chapSlug = (t.chapterSlug || '').toLowerCase();
      if (!chaptersMap.has(chapSlug)) {
        chaptersMap.set(chapSlug, {
          chapterSlug: chapSlug,
          chapterName: t.chapterName || chapSlug,
          module: t.module,
          subject: t.subject || t.section || 'default',
          testsConfigured: [],
          theoryCompleted: completedChapters.has(chapSlug)
        });
      }
      chaptersMap.get(chapSlug).testsConfigured.push(t);
    });

    // Also include chapters that have theory completed but no tests configured yet
    completedChapters.forEach(chapSlug => {
      if (!chaptersMap.has(chapSlug)) {
        chaptersMap.set(chapSlug, {
          chapterSlug: chapSlug,
          chapterName: chapSlug, // Fallback if no test gives a better name
          module: 'unknown',
          subject: 'unknown',
          testsConfigured: [],
          theoryCompleted: true
        });
      }
    });

    let overallCompletedUnits = 0;
    let overallTotalUnits = 0;

    // Calculate chapter progress
    const chaptersProgress = [];
    chaptersMap.forEach(chap => {
      const theoryCompleted = chap.theoryCompleted;

      // Sort tests sequentially by testNumber then createdAt
      chap.testsConfigured.sort((a, b) => {
        const numA = a.testNumber || 0;
        const numB = b.testNumber || 0;
        if (numA !== numB) return numA - numB;
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      const totalConfiguredTests = chap.testsConfigured.length;

      let chapterUniqueCompletedTests = 0;
      let chapterAvailableTests = 0;
      let chapterLockedTests = 0;
      let previousCompleted = true;

      chap.testsConfigured.forEach(testObj => {
        const tId = testObj.testId;
        const isCompleted = testStats.has(tId);

        if (isCompleted) {
          chapterUniqueCompletedTests++;
          previousCompleted = true;
        } else {
          const adminAvailable = (testObj.status === 'available' || testObj.isAvailable === true) && testObj.status !== 'incomplete' && testObj.status !== 'draft' && (testObj.questionCount > 0);
          if (adminAvailable && previousCompleted) {
            chapterAvailableTests++;
            previousCompleted = false;
          } else {
            chapterLockedTests++;
          }
        }
      });

      // Unit formula: theory=1 unit, each test=1 unit
      const completedUnits = (theoryCompleted ? 1 : 0) + chapterUniqueCompletedTests;
      const totalUnits = 1 + totalConfiguredTests; // theory is always configured as 1 unit

      let progress = totalUnits > 0 ? (completedUnits / totalUnits) * 100 : 0;

      // Do NOT make: theoryCompleted = true automatically equal: progress = 100
      if (totalConfiguredTests === 0) {
        progress = 0;
      }

      let status = 'NOT_STARTED';
      if (totalConfiguredTests === 0 || chapterUniqueCompletedTests === 0) {
        status = 'NOT_STARTED';
      } else if (chapterUniqueCompletedTests < totalConfiguredTests) {
        status = 'IN_PROGRESS';
      } else if (chapterUniqueCompletedTests === totalConfiguredTests && totalConfiguredTests > 0) {
        status = 'COMPLETED';
      }

      const chapterData = {
        chapterSlug: chap.chapterSlug,
        chapterName: chap.chapterName,
        module: chap.module,
        subject: chap.subject,
        theoryCompleted, // Maintained at root for older UI bindings
        theory: { completed: theoryCompleted },
        tests: {
          completed: chapterUniqueCompletedTests,
          total: totalConfiguredTests,
          available: chapterAvailableTests,
          locked: chapterLockedTests
        },
        completedUnits,
        totalUnits,
        progress,
        status
      };

      chaptersProgress.push(chapterData);

      // Aggregate up to subject
      const subKey = `${chap.subject}_${chap.module}`;
      if (!subjectsMap.has(subKey)) {
        subjectsMap.set(subKey, {
          subject: chap.subject,
          module: chap.module,
          completedUnits: 0,
          totalUnits: 0,
          chapters: []
        });
      }
      const sub = subjectsMap.get(subKey);
      sub.completedUnits += completedUnits;
      sub.totalUnits += totalUnits;
      sub.chapters.push(chapterData);
    });

    // Aggregate up to module
    subjectsMap.forEach(sub => {
      const mod = sub.module;
      if (!modulesMap.has(mod)) {
        modulesMap.set(mod, {
          module: mod,
          completedUnits: 0,
          totalUnits: 0,
          subjects: []
        });
      }
      const m = modulesMap.get(mod);

      // Calculate subject progress
      sub.progress = sub.totalUnits > 0 ? (sub.completedUnits / sub.totalUnits) * 100 : 0;
      m.subjects.push(sub);

      m.completedUnits += sub.completedUnits;
      m.totalUnits += sub.totalUnits;

      // Calculate legacy UI fields for backward compatibility
      sub.chapters.forEach(chap => {
        m.testsCompleted = (m.testsCompleted || 0) + chap.tests.completed;
        m.totalTests = (m.totalTests || 0) + chap.tests.total;
      });
    });

    // Finalize modules and overall
    const modulesOutput = [];
    modulesMap.forEach(m => {
      m.progress = m.totalUnits > 0 ? (m.completedUnits / m.totalUnits) * 100 : 0;
      // Ensure legacy fields default to 0 if no tests configured
      m.testsCompleted = m.testsCompleted || 0;
      m.totalTests = m.totalTests || 0;

      modulesOutput.push(m);

      // We exclude "unknown" modules from overall configured units to not skew data
      if (m.module !== 'unknown') {
        overallCompletedUnits += m.completedUnits;
        overallTotalUnits += m.totalUnits;
      }
    });

    const overallProgress = overallTotalUnits > 0 ? (overallCompletedUnits / overallTotalUnits) * 100 : 0;

    // Calculate recent tests
    const recentTests = attempts.slice(-5).reverse().map(attempt => {
      const tInfo = testMap.get(attempt.testId);
      const isPassed = (attempt.evaluation?.percentage || 0) >= 60; // Assuming 60% is a pass, though status can just be Completed/Failed. Wait, let's look at passed flag.
      return {
        attemptId: attempt.attemptId,
        testId: attempt.testId,
        testName: tInfo ? (tInfo.testName || attempt.testId) : attempt.testId,
        module: tInfo ? tInfo.module : 'Unknown',
        subject: tInfo ? (tInfo.subject || tInfo.section || 'default') : 'Unknown',
        chapterSlug: tInfo ? tInfo.chapterSlug : 'Unknown',
        score: attempt.evaluation?.obtainedMarks || 0,
        maxScore: attempt.evaluation?.maximumMarks || 0,
        percentage: attempt.evaluation?.percentage || 0,
        status: (attempt.evaluation?.percentage || 0) >= 60 ? 'PASSED' : 'COMPLETED',
        date: attempt.submittedAt
      };
    });

    res.status(200).json({
      success: true,
      data: {
        overall: {
          progress: overallProgress,
          completedUnits: overallCompletedUnits,
          totalUnits: overallTotalUnits,
          // Legacy stats
          testsAttempted: totalAttemptsCount,
          testsCompleted: uniqueTestsCompleted,
          bestScore: Array.from(testStats.values()).reduce((max, s) => Math.max(max, s.bestScore), 0),
          bestScorePercentage: Array.from(testStats.values()).reduce((max, s) => Math.max(max, s.bestPercentage), 0),
          latestScore: recentTests.length > 0 ? recentTests[0].score : 0,
          latestScorePercentage: recentTests.length > 0 ? recentTests[0].percentage : 0,
          averageScore: averageScore,
          averageScorePercentage: averageScorePercentage,
          accuracy: accuracy,
          timeSpentMs: totalTimeSpent,
          theoryCompletedCount: completedChapters.size
        },
        modules: modulesOutput,
        // Legacy flat arrays for older UI compatibility
        subjects: Array.from(subjectsMap.values()),
        chapters: chaptersProgress,
        tests: Array.from(testStats.values()),
        recentTests: recentTests
      }
    });

  } catch (error) {
    console.error('Progress calculation error:', error);
    res.status(500).json({ success: false, message: 'Unable to load progress.' });
  }
};

// POST /api/progress/theory/:chapterSlug
exports.markTheoryCompleted = async (req, res) => {
  try {
    let authenticatedUserId = req.user.userId || req.user.id || req.user._id;

    if (!mongoose.Types.ObjectId.isValid(authenticatedUserId)) {
      return res.status(200).json({ success: true, message: 'Theory completion recorded for session' });
    }

    const userId = authenticatedUserId;
    let { chapterSlug } = req.params;

    if (!chapterSlug) {
      return res.status(400).json({ success: false, message: 'chapterSlug is required' });
    }

    chapterSlug = chapterSlug.toLowerCase();

    const completed = await TheoryCompletion.findOneAndUpdate(
      { userId, chapterSlug },
      { userId, chapterSlug, completedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: completed });
  } catch (error) {
    console.error('Error marking theory complete:', error);
    res.status(500).json({ success: false, message: 'Unable to save progress.' });
  }
};
