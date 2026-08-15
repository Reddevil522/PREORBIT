const mongoose = require('mongoose');
require('dotenv').config();
const PracticeTest = require('./src/models/PracticeTest');
const TestAttempt = require('./src/models/TestAttempt');
const { getTestSummary, getAvailableTests, startTest, resumeTest, retakeTest } = require('./src/controllers/userTestController');

async function testE2E() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await PracticeTest.deleteMany({ chapterSlug: 'fake-chapter' });
  await TestAttempt.deleteMany({ testId: { $in: ['fake-test-1', 'fake-test-2'] } });
  
  const userId = new mongoose.Types.ObjectId('000000000000000000000001');
  
  // 1. Initial State: Old Test 1 and 2
  console.log('--- INITIAL STATE ---');
  await PracticeTest.create({
    module: 'core-cs', subject: 'oop', chapterSlug: 'fake-chapter', testId: 'fake-test-1', testName: 'Fake 1',
    createdAt: new Date('2023-01-01'), status: 'available', isAvailable: true, testNumber: 1
  });
  await PracticeTest.create({
    module: 'core-cs', subject: 'oop', chapterSlug: 'fake-chapter', testId: 'fake-test-2', testName: 'Fake 2',
    createdAt: new Date('2023-01-01'), status: 'available', isAvailable: true, testNumber: 2
  });
  
  // Student completed Test 1
  await TestAttempt.create({
    attemptId: 'atm-1', userId, testId: 'fake-test-1', status: 'submitted',
    startedAt: new Date('2023-01-02'), submittedAt: new Date('2023-01-02')
  });

  const req = { user: { userId, role: 'student' }, query: { module: 'core-cs', subject: 'oop' }, params: { testId: 'fake-test-1' } };
  
  const getRes = (callback) => ({
    status: function(code) { this.code = code; return this; },
    json: function(data) { callback(data); }
  });

  await getTestSummary(req, getRes(data => console.log('Summary (Before):', data.data)));
  
  // 2. Complete re-upload (Delete old, insert new with new createdAt)
  console.log('\n--- ADMIN RE-UPLOADS ---');
  await PracticeTest.deleteMany({ chapterSlug: 'fake-chapter' });
  await PracticeTest.create({
    module: 'core-cs', subject: 'oop', chapterSlug: 'fake-chapter', testId: 'fake-test-1', testName: 'Fake 1',
    createdAt: new Date('2023-02-01'), status: 'available', isAvailable: true, testNumber: 1
  });
  await PracticeTest.create({
    module: 'core-cs', subject: 'oop', chapterSlug: 'fake-chapter', testId: 'fake-test-2', testName: 'Fake 2',
    createdAt: new Date('2023-02-01'), status: 'available', isAvailable: true, testNumber: 2
  });
  
  await getTestSummary(req, getRes(data => console.log('Summary (After Re-upload):', data.data)));
  
  // 3. Test 1 Retake Test (should fail because new test not submitted)
  console.log('\n--- ATTEMPT RETAKE (should fail 400) ---');
  await retakeTest(req, getRes(data => console.log('Retake Test Response:', data.message)), (err) => console.log('Error caught in next:', err));
  
  // Clean up
  await PracticeTest.deleteMany({ chapterSlug: 'fake-chapter' });
  await TestAttempt.deleteMany({ testId: { $in: ['fake-test-1', 'fake-test-2'] } });

  process.exit(0);
}

testE2E();
