const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/preorbit').then(async () => {
  const db = mongoose.connection.db;
  const collection = db.collection('practicetests');
  const test = await collection.findOne({ testName: /Inheritance Test 1/ });
  console.log(test);
  mongoose.disconnect();
});
