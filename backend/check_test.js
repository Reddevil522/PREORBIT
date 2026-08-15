const mongoose = require('mongoose');

async function check() {
  await mongoose.connect('mongodb://localhost:27017/preorbit');
  const db = mongoose.connection.db;
  const collection = db.collection('practicetests');
  
  const test = await collection.findOne({ testName: { $regex: 'Inheritance Test' } });
  console.log("TEST:", test);
  
  await mongoose.disconnect();
}

check().catch(console.error);
