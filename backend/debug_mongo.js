const mongoose = require('mongoose');
const PracticeTest = require('./src/models/PracticeTest');

async function run() {
  await mongoose.connect('mongodb+srv://gopalkumar20357_db_user:EaqZoMsWwEb6dBC4@students.j2tziix.mongodb.net');
  console.log('--- ALL TESTS RETURNED BY MANAGEMENT QUERY ---');
  const allTests = await PracticeTest.find({});
  allTests.forEach(t => console.log(t.testName, t.testId, t.chapterSlug, t.status));
  process.exit(0);
}
run();

