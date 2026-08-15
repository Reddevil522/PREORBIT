const mongoose = require('mongoose');
require('dotenv').config();
const { getTestSummary } = require('./src/controllers/userTestController');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const req = {
    user: {
      userId: new mongoose.Types.ObjectId('000000000000000000000001'),
      role: 'student'
    },
    query: {
      module: 'core-cs'
    }
  };
  
  const res = {
    status: function(code) { this.code = code; return this; },
    json: function(data) { console.log('API Response:', JSON.stringify(data, null, 2)); }
  };
  
  console.log('Testing summary API for core-cs...');
  await getTestSummary(req, res, () => {});

  process.exit(0);
}

run();
