const mongoose = require('mongoose');
const TestStatusService = require('./src/services/admin/TestStatusService');

async function run() {
  await mongoose.connect('mongodb+srv://gopalkumar20357_db_user:EaqZoMsWwEb6dBC4@students.j2tziix.mongodb.net');
  try {
    const doc = await TestStatusService.updateStatus({
      module: 'core-cs',
      subject: 'oop',
      chapterSlug: 'inheritance',
      testId: 'inheritance-test-2',
      testName: 'Inheritance Test 2',
      testNumber: undefined,
      chapterName: undefined
    });
    console.log('SUCCESS:', doc);
  } catch (err) {
    console.log('ERROR:', err);
  }
  process.exit(0);
}
run();

