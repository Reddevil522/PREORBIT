const mongoose = require('mongoose');
require('dotenv').config();
const PracticeTest = require('./src/models/PracticeTest');
const TestAttempt = require('./src/models/TestAttempt');

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

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Clean up
  await PracticeTest.deleteMany({ testId: 'fake-test-1' });
  await PracticeTest.deleteMany({ testId: 'fake-test-2' });
  await TestAttempt.deleteMany({ testId: 'fake-test-1' });
  
  const userId = new mongoose.Types.ObjectId('000000000000000000000001');
  
  // 1. Create a "fake" test 1 and an old attempt
  const t1 = await PracticeTest.create({
    module: 'core-cs',
    chapterSlug: 'fake-chapter',
    testId: 'fake-test-1',
    testName: 'Fake 1',
    createdAt: new Date('2023-01-01')
  });
  
  const t2 = await PracticeTest.create({
    module: 'core-cs',
    chapterSlug: 'fake-chapter',
    testId: 'fake-test-2',
    testName: 'Fake 2',
    createdAt: new Date('2023-01-01')
  });

  // Old attempt that occurred BEFORE the current version was created
  // Wait, if t1 is created on 2023-01-01, let's say the attempt was in 2022
  await TestAttempt.create({
    attemptId: 'atm-1',
    userId,
    testId: 'fake-test-1',
    status: 'submitted',
    startedAt: new Date('2022-01-01'),
    submittedAt: new Date('2022-01-02')
  });
  
  const lockedOldAttempt = await isTestSequentiallyLocked(t2, userId);
  console.log("Scenario A: Test 2 locked when previous test has new createdAt? Expected true. Result:", lockedOldAttempt);
  
  // Update attempt to be recent
  await TestAttempt.updateOne({ attemptId: 'atm-1' }, { submittedAt: new Date('2024-01-01') });
  
  const lockedNewAttempt = await isTestSequentiallyLocked(t2, userId);
  console.log("Scenario B: Test 2 locked when attempt is newer than test createdAt? Expected false. Result:", lockedNewAttempt);

  process.exit(0);
}

run();
