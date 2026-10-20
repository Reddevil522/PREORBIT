// ============================================================
// PREORBIT — Seed All 19 CDS English Tests (340 Questions)
// ============================================================
// Idempotently validates and publishes full CDS English test content:
//   - Grammar (9 Tests x 20 MCQs = 180 MCQs)
//   - Vocabulary (6 Tests x 20 MCQs = 120 MCQs)
//   - Reading Comprehension (4 Tests x 10 MCQs = 40 MCQs, 8 Passages)
// ============================================================

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const { connectDatabase } = require('../config/database');
const CDSTestPublishingService = require('../services/cds/CDSTestPublishingService');
const { allCdsTests } = require('../data/cds/tests');

async function seedAllCDSTests() {
  console.log('====================================================');
  console.log('PREORBIT — Publishing All 19 CDS English Test Suites');
  console.log('====================================================');

  try {
    await connectDatabase();

    let publishedCount = 0;
    let totalQuestionsCount = 0;

    for (let i = 0; i < allCdsTests.length; i++) {
      const test = allCdsTests[i];
      const testNum = i + 1;
      process.stdout.write(`[${testNum}/19] Validating & publishing "${test.testId}" (${test.section})... `);

      const result = await CDSTestPublishingService.publishTest(test, true);
      publishedCount++;
      totalQuestionsCount += result.questionCount;
      console.log(`✓ OK (${result.questionCount} questions)`);
    }

    console.log('\n====================================================');
    console.log(`✓ All ${publishedCount} CDS English tests published successfully!`);
    console.log(`✓ Total questions in database: ${totalQuestionsCount}`);
    console.log('====================================================\n');

  } catch (err) {
    console.error('\n❌ Seeding failed:', err.message);
    if (err.validationErrors) {
      console.error('Validation errors:', err.validationErrors);
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
}

if (require.main === module) {
  seedAllCDSTests();
}

module.exports = seedAllCDSTests;
