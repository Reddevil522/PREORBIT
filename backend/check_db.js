const mongoose = require('mongoose');
const PracticeTest = require('./src/models/PracticeTest');

async function check() {
  await mongoose.connect('mongodb://localhost:27017/preorbit');
  const tests = await PracticeTest.find({});
  console.log("ALL TESTS IN DB:");
  tests.forEach(t => {
    console.log(`- ID: ${t.testId}, Name: "${t.testName}", Module: "${t.module}", Subject: "${t.subject}", Section: "${t.section}", Chapter: "${t.chapterSlug}", Status: "${t.status}", isAvailable: ${t.isAvailable}, Number: ${t.testNumber}`);
  });
  process.exit(0);
}
check();
