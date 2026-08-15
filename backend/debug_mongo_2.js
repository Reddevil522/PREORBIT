const mongoose = require('mongoose');
const OOPQuestion = require('./src/models/core-cs/OOPQuestion');

async function run() {
  await mongoose.connect('mongodb+srv://gopalkumar20357_db_user:EaqZoMsWwEb6dBC4@students.j2tziix.mongodb.net');
  console.log('--- QUESTIONS FOR INHERITANCE TEST 2 ---');
  const q2 = await OOPQuestion.find({ testId: 'inheritance-test-2' });
  console.log('Count: ' + q2.length);
  process.exit(0);
}
run();

