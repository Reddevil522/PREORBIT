const mongoose = require('mongoose');
const PracticeTest = require('./src/models/PracticeTest');

async function run() {
  await mongoose.connect('mongodb+srv://gopalkumar20357_db_user:EaqZoMsWwEb6dBC4@students.j2tziix.mongodb.net');
  console.log(await PracticeTest.collection.indexes());
  process.exit(0);
}
run();

