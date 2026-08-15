const mongoose = require('mongoose');
require('dotenv').config();
const PracticeTest = require('./src/models/PracticeTest');
const TestAttempt = require('./src/models/TestAttempt');
const { startTest } = require('./src/controllers/userTestController');

async function testStartTest() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await PracticeTest.deleteMany({ testId: 'fake-test-1' });
  await TestAttempt.deleteMany({ testId: 'fake-test-1' });
  
  const userId = new mongoose.Types.ObjectId('000000000000000000000001');
  
  // 1. Create a "fake" test 1
  const t1 = await PracticeTest.create({
    module: 'core-cs',
    subject: 'oop',
    chapterSlug: 'fake-chapter',
    testId: 'fake-test-1',
    testName: 'Fake 1',
    createdAt: new Date('2023-01-01'),
    status: 'available',
    isAvailable: true
  });
  
  // 2. Create an old submitted attempt
  await TestAttempt.create({
    attemptId: 'atm-1',
    userId,
    testId: 'fake-test-1',
    status: 'submitted',
    startedAt: new Date('2022-01-01'),
    submittedAt: new Date('2022-01-02')
  });
  
  const req = {
    user: { userId, role: 'student' },
    params: { testId: 'fake-test-1' }
  };
  
  const res = {
    status: function(code) { this.code = code; return this; },
    json: function(data) { console.log('API Response (Start Test):', JSON.stringify(data, null, 2)); }
  };
  
  console.log('Testing startTest with old attempt...');
  await startTest(req, res, (err) => { if (err) console.error(err); });
  
  // Clean up
  await PracticeTest.deleteMany({ testId: 'fake-test-1' });
  await TestAttempt.deleteMany({ testId: 'fake-test-1' });

  process.exit(0);
}

testStartTest();
