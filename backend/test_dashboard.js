const mongoose = require('mongoose');
require('dotenv').config();
const PracticeTest = require('./src/models/PracticeTest');
const TestAttempt = require('./src/models/TestAttempt');

async function testGetAvailableTests() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await PracticeTest.deleteMany({ testId: 'fake-test-1' });
  await PracticeTest.deleteMany({ testId: 'fake-test-2' });
  await TestAttempt.deleteMany({ testId: 'fake-test-1' });
  
  const userId = new mongoose.Types.ObjectId('000000000000000000000001');
  
  const tests = [
    {
      module: 'core-cs',
      chapterSlug: 'fake-chapter',
      testId: 'fake-test-1',
      testName: 'Fake 1',
      createdAt: new Date('2023-01-01'),
      status: 'available',
      isAvailable: true,
      testNumber: 1
    },
    {
      module: 'core-cs',
      chapterSlug: 'fake-chapter',
      testId: 'fake-test-2',
      testName: 'Fake 2',
      createdAt: new Date('2023-01-01'),
      status: 'available',
      isAvailable: true,
      testNumber: 2
    }
  ];
  
  const submittedAttempts = [
    {
      testId: 'fake-test-1',
      submittedAt: new Date('2022-01-01') // Older than test creation (deleted test version)
    }
  ];

  const completedAttemptsMap = new Map();
  for (const attempt of submittedAttempts) {
     const existing = completedAttemptsMap.get(attempt.testId);
     if (!existing || new Date(attempt.submittedAt) > new Date(existing)) {
        completedAttemptsMap.set(attempt.testId, attempt.submittedAt);
     }
  }

  const processedTests = [];
  let previousCompleted = true;

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
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
  
  console.log(processedTests.map(t => ({ name: t.testName, completed: t.isCompleted, locked: t.isLocked })));

  // Update attempt to be recent
  submittedAttempts[0].submittedAt = new Date('2024-01-01');
  
  completedAttemptsMap.clear();
  for (const attempt of submittedAttempts) {
     const existing = completedAttemptsMap.get(attempt.testId);
     if (!existing || new Date(attempt.submittedAt) > new Date(existing)) {
        completedAttemptsMap.set(attempt.testId, attempt.submittedAt);
     }
  }

  const processedTests2 = [];
  previousCompleted = true;

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
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

    processedTests2.push({
      ...test,
      isCompleted,
      isLocked
    });

    previousCompleted = isCompleted;
  }

  console.log(processedTests2.map(t => ({ name: t.testName, completed: t.isCompleted, locked: t.isLocked })));

  process.exit(0);
}

testGetAvailableTests();
