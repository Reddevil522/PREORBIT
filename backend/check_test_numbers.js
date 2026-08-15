const mongoose = require('mongoose');
require('dotenv').config();
const PracticeTest = require('./src/models/PracticeTest');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const tests = await PracticeTest.find().select('testId testName testNumber');
  console.log(tests);
  process.exit(0);
}
run();
