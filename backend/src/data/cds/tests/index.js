// ============================================================
// PREORBIT — CDS English Master Test Content Bank
// ============================================================
// Aggregates all 19 verified tests (340 MCQs total):
//   - Grammar (9 Tests x 20 MCQs = 180 MCQs)
//   - Vocabulary (6 Tests x 20 MCQs = 120 MCQs)
//   - Reading Comprehension (4 Tests x 10 MCQs = 40 MCQs across 8 Passages)
// ============================================================

const grammarTests = require('./grammarTests');
const vocabularyTests = require('./vocabularyTests');
const readingComprehensionTests = require('./readingComprehensionTests');

const allCdsTests = [
  ...grammarTests,
  ...vocabularyTests,
  ...readingComprehensionTests
];

module.exports = {
  grammarTests,
  vocabularyTests,
  readingComprehensionTests,
  allCdsTests
};
