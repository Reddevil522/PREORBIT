const mongoose = require('mongoose');
const PracticeTest = require('./src/models/PracticeTest');

async function run() {
  await mongoose.connect('mongodb+srv://gopalkumar20357_db_user:EaqZoMsWwEb6dBC4@students.j2tziix.mongodb.net');
  try {
    await PracticeTest.collection.dropIndex('chapterSlug_1_testNumber_1');
    console.log('Dropped sparse index.');
  } catch(e) {}
  
  try {
    // Mongoose syncIndexes will create the new one defined in the schema
    await PracticeTest.syncIndexes();
    console.log('Synced indexes!');
  } catch(e) {
    console.log('Sync err:', e);
  }

  console.log(await PracticeTest.collection.indexes());
  process.exit(0);
}
run();

