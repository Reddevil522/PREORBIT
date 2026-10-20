// ============================================================
// PREORBIT — Comprehensive Automated Test Suite for CDS English
// ============================================================
// Tests:
//   1. General MCQ Structure & Option Validation
//   2. Grammar Test Validation (20 MCQs)
//   3. Synonyms & Antonyms Composition (10+10 Split, no string matching)
//   4. Other Vocabulary Chapters (20 MCQs, ignores 10+10)
//   5. Reading Comprehension (2 Passages x 5 MCQs = 10 MCQs)
//   6. Atomic Creation / Publishing & Partial-Write Prevention
//   7. Answer Security & Sanitization (No answers before submission)
//   8. Authoritative Server-Side Scoring
//   9. Cross-User Privacy & Attempt Isolation
//  10. Invalid Submission Payloads
//  11. Existing Aptitude Module Regression
// ============================================================

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const { connectDatabase } = require('../config/database');

const CDSEnglishQuestion = require('../models/cds/CDSEnglishQuestion');
const PracticeTest = require('../models/PracticeTest');
const TestAttempt = require('../models/TestAttempt');
const AptitudeQuestion = require('../models/aptitude/AptitudeQuestion');
const User = require('../models/User');

const CDSTestValidationService = require('../services/cds/CDSTestValidationService');
const CDSTestPublishingService = require('../services/cds/CDSTestPublishingService');
const TestStatusService = require('../services/admin/TestStatusService');
const QuestionImportService = require('../services/admin/QuestionImportService');
const adminTestController = require('../controllers/admin/adminTestController');
const ImportHistory = require('../models/admin/ImportHistory');
const { requireRole } = require('../middleware/roleMiddleware');
const userTestController = require('../controllers/userTestController');

let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, detail = '') {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
    failedTests++;
  }
}

// Helper to generate a dummy valid MCQ
function createValidMCQ(index = 1, overrides = {}) {
  return {
    question: `Sample CDS English question text number ${index} for testing?`,
    options: [
      { key: 'A', text: `Option A for question ${index}` },
      { key: 'B', text: `Option B for question ${index}` },
      { key: 'C', text: `Option C for question ${index}` },
      { key: 'D', text: `Option D for question ${index}` }
    ],
    correctAnswer: 'A',
    explanation: `Detailed explanation for why option A is correct for question ${index}.`,
    marks: 1,
    questionType: 'mcq',
    ...overrides
  };
}

// Mock Express response helper
function createMockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    }
  };
  return res;
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('PREORBIT — CDS English Automated Test Suite');
  console.log('====================================================');

  await connectDatabase();

  // ──────────────────────────────────────────────────────────
  // 1. General MCQ Structure & Option Validation
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 1] General MCQ Structure & Option Validation');

  // Valid MCQ
  const validMCQ = createValidMCQ(1);
  const vErrors = CDSTestValidationService.validateMCQQuestion(validMCQ);
  assert(vErrors.length === 0, 'Valid MCQ passes validation with 0 errors');

  // Short question text (<5 chars)
  const shortQ = createValidMCQ(1, { question: 'Why?' });
  const sqErrors = CDSTestValidationService.validateMCQQuestion(shortQ);
  assert(sqErrors.some(e => e.includes('at least 5 characters')), 'Rejects question text < 5 characters');

  // Less than 4 options (3 options)
  const threeOpts = createValidMCQ(1, {
    options: [
      { key: 'A', text: 'Opt A' },
      { key: 'B', text: 'Opt B' },
      { key: 'C', text: 'Opt C' }
    ]
  });
  const toErrors = CDSTestValidationService.validateMCQQuestion(threeOpts);
  assert(toErrors.some(e => e.includes('exactly 4 options')), 'Rejects question with fewer than 4 options');

  // Duplicate option keys
  const dupKeys = createValidMCQ(1, {
    options: [
      { key: 'A', text: 'Opt A' },
      { key: 'A', text: 'Opt duplicate A' },
      { key: 'B', text: 'Opt B' },
      { key: 'C', text: 'Opt C' }
    ]
  });
  const dkErrors = CDSTestValidationService.validateMCQQuestion(dupKeys);
  assert(dkErrors.some(e => e.includes('Duplicate option key')), 'Rejects duplicate option keys');

  // Empty option text
  const emptyOptText = createValidMCQ(1, {
    options: [
      { key: 'A', text: '' },
      { key: 'B', text: 'Opt B' },
      { key: 'C', text: 'Opt C' },
      { key: 'D', text: 'Opt D' }
    ]
  });
  const eotErrors = CDSTestValidationService.validateMCQQuestion(emptyOptText);
  assert(eotErrors.some(e => e.includes('Option text cannot be empty')), 'Rejects empty option text');

  // Invalid correctAnswer key
  const invalidAns = createValidMCQ(1, { correctAnswer: 'Z' });
  const iaErrors = CDSTestValidationService.validateMCQQuestion(invalidAns);
  assert(iaErrors.some(e => e.includes('Correct answer must be one of')), 'Rejects correctAnswer not in [A, B, C, D]');

  // Missing explanation
  const noExpl = createValidMCQ(1, { explanation: '' });
  const neErrors = CDSTestValidationService.validateMCQQuestion(noExpl);
  assert(neErrors.some(e => e.includes('Explanation must be provided')), 'Rejects missing explanation');

  // Question with 5 options
  const fiveOpts = createValidMCQ(1, {
    options: [
      { key: 'A', text: 'Opt A' },
      { key: 'B', text: 'Opt B' },
      { key: 'C', text: 'Opt C' },
      { key: 'D', text: 'Opt D' },
      { key: 'E', text: 'Opt E' }
    ]
  });
  const foErrors = CDSTestValidationService.validateMCQQuestion(fiveOpts);
  assert(foErrors.some(e => e.includes('Must contain exactly 4 options')), 'Rejects question with 5 options');

  // Question with questionType other than 'mcq'
  const invalidType = createValidMCQ(1, { questionType: 'multiple-choice' });
  const itErrors = CDSTestValidationService.validateMCQQuestion(invalidType);
  assert(itErrors.some(e => e.includes('only supports single-choice \'mcq\'')), 'Rejects questionType other than "mcq"');

  // ──────────────────────────────────────────────────────────
  // 2. Grammar Section Rules (Exactly 20 MCQs)
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 2] Grammar Section Rules (Exactly 20 MCQs)');

  const validGrammarQuestions = Array.from({ length: 20 }, (_, i) => createValidMCQ(i + 1));
  const validGrammarPayload = {
    module: 'cds',
    section: 'grammar',
    chapterSlug: 'spotting-errors',
    testId: 'test-grammar-sample',
    testName: 'Sample Grammar Test',
    questions: validGrammarQuestions
  };
  const gResult = CDSTestValidationService.validateCDSTest(validGrammarPayload);
  assert(gResult.valid && gResult.errors.length === 0, 'Grammar test with exactly 20 valid MCQs passes');

  // Invalid count: 19 questions
  const shortGrammarPayload = {
    ...validGrammarPayload,
    questions: validGrammarQuestions.slice(0, 19)
  };
  const sgResult = CDSTestValidationService.validateCDSTest(shortGrammarPayload);
  assert(!sgResult.valid && sgResult.errors.some(e => e.includes('exactly 20 questions')), 'Rejects Grammar test with 19 questions');

  // Invalid count: 21 questions
  const longGrammarPayload = {
    ...validGrammarPayload,
    questions: [...validGrammarQuestions, createValidMCQ(21)]
  };
  const lgResult = CDSTestValidationService.validateCDSTest(longGrammarPayload);
  assert(!lgResult.valid && lgResult.errors.some(e => e.includes('exactly 20 questions')), 'Rejects Grammar test with 21 questions');

  // Invalid chapter slug
  const badChapterGrammar = {
    ...validGrammarPayload,
    chapterSlug: 'non-existent-grammar-chapter'
  };
  const bcResult = CDSTestValidationService.validateCDSTest(badChapterGrammar);
  assert(!bcResult.valid && bcResult.errors.some(e => e.includes('Invalid chapterSlug')), 'Rejects invalid grammar chapterSlug');

  // ──────────────────────────────────────────────────────────
  // 3. Combined Synonyms & Antonyms Chapter Composition (10+10 Split)
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 3] Combined Synonyms & Antonyms Composition (10+10 Split)');

  const validSynAntQuestions = [
    ...Array.from({ length: 10 }, (_, i) => createValidMCQ(i + 1, { subTopic: 'synonym' })),
    ...Array.from({ length: 10 }, (_, i) => createValidMCQ(i + 11, { subTopic: 'antonym' }))
  ];

  const validSynAntPayload = {
    module: 'cds',
    section: 'vocabulary',
    chapterSlug: 'synonyms-antonyms',
    testId: 'test-syn-ant-sample',
    testName: 'Sample Synonyms & Antonyms',
    questions: validSynAntQuestions
  };

  const saResult = CDSTestValidationService.validateCDSTest(validSynAntPayload);
  assert(saResult.valid && saResult.errors.length === 0, 'Synonyms & Antonyms with 10 synonyms + 10 antonyms passes');

  // Uneven split: 9 synonyms + 11 antonyms
  const unevenSplitQuestions = [
    ...Array.from({ length: 9 }, (_, i) => createValidMCQ(i + 1, { subTopic: 'synonym' })),
    ...Array.from({ length: 11 }, (_, i) => createValidMCQ(i + 10, { subTopic: 'antonym' }))
  ];
  const unevenResult = CDSTestValidationService.validateCDSTest({
    ...validSynAntPayload,
    questions: unevenSplitQuestions
  });
  assert(!unevenResult.valid && unevenResult.errors.some(e => e.includes('exactly 10 questions with subTopic: \'synonym\'')), 'Rejects uneven 9+11 split');

  // Missing or invalid subTopic (unclassified questions)
  const unclassifiedQuestions = [
    ...Array.from({ length: 10 }, (_, i) => createValidMCQ(i + 1, { subTopic: 'synonym' })),
    ...Array.from({ length: 9 }, (_, i) => createValidMCQ(i + 11, { subTopic: 'antonym' })),
    createValidMCQ(20, { subTopic: null }) // Unclassified!
  ];
  const unclassifiedResult = CDSTestValidationService.validateCDSTest({
    ...validSynAntPayload,
    questions: unclassifiedQuestions
  });
  assert(!unclassifiedResult.valid && unclassifiedResult.errors.some(e => e.includes('missing or invalid subTopic')), 'Rejects questions with missing subTopic');

  // Synonyms & Antonyms with 19 questions
  const shortSynAntResult = CDSTestValidationService.validateCDSTest({
    ...validSynAntPayload,
    questions: validSynAntQuestions.slice(0, 19)
  });
  assert(!shortSynAntResult.valid && shortSynAntResult.errors.some(e => e.includes('exactly 20 questions')), 'Rejects Synonyms & Antonyms with 19 questions');

  // Synonyms & Antonyms with 21 questions
  const longSynAntResult = CDSTestValidationService.validateCDSTest({
    ...validSynAntPayload,
    questions: [...validSynAntQuestions, createValidMCQ(21, { subTopic: 'synonym' })]
  });
  assert(!longSynAntResult.valid && longSynAntResult.errors.some(e => e.includes('exactly 20 questions')), 'Rejects Synonyms & Antonyms with 21 questions');

  // ──────────────────────────────────────────────────────────
  // 4. Other Vocabulary Chapters (20 MCQs, ignores 10+10 rule)
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 4] Other Vocabulary Chapters (20 MCQs, No 10+10 Requirement)');

  const idiomsQuestions = Array.from({ length: 20 }, (_, i) => createValidMCQ(i + 1));
  const idiomsPayload = {
    module: 'cds',
    section: 'vocabulary',
    chapterSlug: 'idioms-phrases',
    testId: 'test-idioms-sample',
    testName: 'Idioms & Phrases Test 1',
    questions: idiomsQuestions
  };
  const idiomsResult = CDSTestValidationService.validateCDSTest(idiomsPayload);
  assert(idiomsResult.valid && idiomsResult.errors.length === 0, 'Idioms & Phrases passes with 20 MCQs without subTopic requirement');

  // ──────────────────────────────────────────────────────────
  // 5. Reading Comprehension Structure & Passage Relations (2 Passages x 5 MCQs = 10 MCQs)
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 5] Reading Comprehension (2 Passages x 5 MCQs = 10 MCQs)');

  const validPassage1 = 'This is the verified reading passage number 1 for CDS English comprehension testing.';
  const validPassage2 = 'This is the verified reading passage number 2 detailing strategic defense paradigms.';

  const validRCQuestions = [
    ...Array.from({ length: 5 }, (_, i) => createValidMCQ(i + 1, { passageNumber: 1, passageText: validPassage1 })),
    ...Array.from({ length: 5 }, (_, i) => createValidMCQ(i + 6, { passageNumber: 2, passageText: validPassage2 }))
  ];

  const validRCPayload = {
    module: 'cds',
    section: 'reading-comprehension',
    chapterSlug: 'factual-comprehension',
    testId: 'test-rc-sample',
    testName: 'Factual Comprehension Test 1',
    passages: [
      { number: 1, text: validPassage1 },
      { number: 2, text: validPassage2 }
    ],
    questions: validRCQuestions
  };

  const rcResult = CDSTestValidationService.validateCDSTest(validRCPayload);
  assert(rcResult.valid && rcResult.errors.length === 0, 'Reading Comprehension with 2 passages x 5 MCQs passes');

  // Invalid question count (e.g. 8 questions total)
  const shortRCQuestions = validRCQuestions.slice(0, 8);
  const shortRCResult = CDSTestValidationService.validateCDSTest({
    ...validRCPayload,
    questions: shortRCQuestions
  });
  assert(!shortRCResult.valid && shortRCResult.errors.some(e => e.includes('exactly 10 questions')), 'Rejects RC test with fewer than 10 questions');

  // Uneven passage association (Passage 1 has 6, Passage 2 has 4)
  const unevenRCQuestions = [
    ...Array.from({ length: 6 }, (_, i) => createValidMCQ(i + 1, { passageNumber: 1, passageText: validPassage1 })),
    ...Array.from({ length: 4 }, (_, i) => createValidMCQ(i + 7, { passageNumber: 2, passageText: validPassage2 }))
  ];
  const unevenRCResult = CDSTestValidationService.validateCDSTest({
    ...validRCPayload,
    questions: unevenRCQuestions
  });
  assert(!unevenRCResult.valid && unevenRCResult.errors.some(e => e.includes('Passage 1 must have exactly 5 associated questions')), 'Rejects uneven 6+4 RC passage distribution');

  // Missing or short passage text
  const shortPassageQuestions = [
    ...Array.from({ length: 5 }, (_, i) => createValidMCQ(i + 1, { passageNumber: 1, passageText: 'Too short text' })),
    ...Array.from({ length: 5 }, (_, i) => createValidMCQ(i + 6, { passageNumber: 2, passageText: validPassage2 }))
  ];
  const spResult = CDSTestValidationService.validateCDSTest({
    ...validRCPayload,
    passages: [],
    questions: shortPassageQuestions
  });
  assert(!spResult.valid && spResult.errors.some(e => e.includes('missing or shorter than 20 characters')), 'Rejects reading passages with missing or short text');

  // 11 total Reading Comprehension questions
  const elevenRCQuestions = [...validRCQuestions, createValidMCQ(11, { passageNumber: 1, passageText: validPassage1 })];
  const elevenRCResult = CDSTestValidationService.validateCDSTest({
    ...validRCPayload,
    questions: elevenRCQuestions
  });
  assert(!elevenRCResult.valid && elevenRCResult.errors.some(e => e.includes('exactly 10 questions')), 'Rejects RC test with 11 questions');

  // Exactly 1 passage provided
  const onePassageResult = CDSTestValidationService.validateCDSTest({
    ...validRCPayload,
    passages: [{ number: 1, text: validPassage1 }]
  });
  assert(!onePassageResult.valid && onePassageResult.errors.some(e => e.includes('exactly 2 reading passages')), 'Rejects RC test with 1 passage');

  // Exactly 3 passages provided
  const threePassageResult = CDSTestValidationService.validateCDSTest({
    ...validRCPayload,
    passages: [
      { number: 1, text: validPassage1 },
      { number: 2, text: validPassage2 },
      { number: 3, text: 'This is an unauthorized third passage for the test.' }
    ]
  });
  assert(!threePassageResult.valid && threePassageResult.errors.some(e => e.includes('exactly 2 reading passages')), 'Rejects RC test with 3 passages');

  // Question referencing nonexistent passage number (e.g. 3)
  const nonExistentPassageQuestions = [
    ...Array.from({ length: 5 }, (_, i) => createValidMCQ(i + 1, { passageNumber: 1, passageText: validPassage1 })),
    ...Array.from({ length: 4 }, (_, i) => createValidMCQ(i + 6, { passageNumber: 2, passageText: validPassage2 })),
    createValidMCQ(10, { passageNumber: 3, passageText: 'Passage 3 text for testing non-existent passage.' })
  ];
  const nepResult = CDSTestValidationService.validateCDSTest({
    ...validRCPayload,
    questions: nonExistentPassageQuestions
  });
  assert(!nepResult.valid && nepResult.errors.some(e => e.includes('Must be 1 or 2')), 'Rejects questions referencing nonexistent passage number (e.g. 3)');

  // ──────────────────────────────────────────────────────────
  // 6. Atomic Publishing & Partial-Write Prevention
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 6] Atomic Publishing & Partial-Write Prevention');

  const invalidPublishPayload = {
    module: 'cds',
    section: 'grammar',
    chapterSlug: 'spotting-errors',
    testId: 'test-atomic-fail-1',
    testName: 'Fail Test',
    questions: Array.from({ length: 15 }, (_, i) => createValidMCQ(i + 1)) // 15 instead of 20!
  };

  let publishErrorCaught = false;
  try {
    await CDSTestPublishingService.publishTest(invalidPublishPayload);
  } catch (err) {
    publishErrorCaught = true;
  }
  assert(publishErrorCaught, 'Publishing invalid test throws an error');

  // Verify zero documents were persisted in database
  const orphanedQuestions = await CDSEnglishQuestion.find({ testId: 'test-atomic-fail-1' });
  const orphanedPracticeTest = await PracticeTest.findOne({ testId: 'test-atomic-fail-1' });
  assert(orphanedQuestions.length === 0, 'Zero questions persisted for invalid test (no orphaned questions)');
  assert(!orphanedPracticeTest, 'Zero PracticeTest created for invalid test (no partial publish)');

  // ──────────────────────────────────────────────────────────
  // 7. Answer Security & Sanitization
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 7] Answer Security & Sanitization');

  // Test start test / resume sanitization
  const testRecord = await PracticeTest.findOne({ testId: 'spotting-errors-test-1' });
  assert(!!testRecord, 'Seeded test "spotting-errors-test-1" exists in database');

  const mockUser = {
    userId: new mongoose.Types.ObjectId(),
    role: 'student'
  };

  const startReq = {
    params: { testId: 'spotting-errors-test-1' },
    user: mockUser
  };
  const startRes = createMockRes();
  const nextFn = (err) => { if (err) console.error('Controller error:', err); };

  await userTestController.startTest(startReq, startRes, nextFn);
  assert(startRes.statusCode === 200, 'startTest returns HTTP 200');

  const returnedQuestions = startRes.body?.data?.questions || [];
  assert(returnedQuestions.length === 20, 'Returns all 20 questions in initial test-taking payload');

  const answerLeaked = returnedQuestions.some(q => q.correctAnswer !== undefined || q.explanation !== undefined);
  assert(!answerLeaked, 'CRITICAL: No correctAnswer or explanation is leaked in test-taking payload');

  const activeAttemptId = startRes.body?.data?.attemptId;
  assert(!!activeAttemptId, 'Generated valid active attempt ID');

  // ──────────────────────────────────────────────────────────
  // 8. Server-Side Scoring & Authoritative Evaluation
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 8] Server-Side Scoring & Authoritative Evaluation');

  // Fetch actual correct answers from DB to construct known test answers
  const actualQuestions = await CDSEnglishQuestion.find({ testId: 'spotting-errors-test-1' }).lean();
  const qMap = new Map();
  actualQuestions.forEach(q => qMap.set(q._id.toString(), q));

  // Construct submission: 15 correct, 3 incorrect, 2 unattempted
  const answersPayload = [];
  returnedQuestions.forEach((q, idx) => {
    const dbQ = qMap.get(q._id.toString());
    if (idx < 15) {
      // Correct
      answersPayload.push({ questionId: q._id.toString(), selectedAnswer: dbQ.correctAnswer });
    } else if (idx < 18) {
      // Incorrect: Pick a wrong answer
      const wrongOpt = ['A', 'B', 'C', 'D'].find(opt => opt !== dbQ.correctAnswer);
      answersPayload.push({ questionId: q._id.toString(), selectedAnswer: wrongOpt });
    }
    // remaining 2 are left unattempted
  });

  const submitReq = {
    params: { testId: 'spotting-errors-test-1' },
    body: {
      attemptId: activeAttemptId,
      answers: answersPayload,
      clientScore: 999 // Client-supplied bogus score that MUST be ignored!
    },
    user: mockUser
  };
  const submitRes = createMockRes();

  await userTestController.submitTest(submitReq, submitRes, nextFn);
  assert(submitRes.statusCode === 200, 'submitTest returns HTTP 200');

  const evaluation = submitRes.body?.data?.result;
  assert(evaluation.obtainedMarks === 15, `Server calculates obtainedMarks = 15 (got ${evaluation.obtainedMarks})`);
  assert(evaluation.totalQuestions === 20, `Server calculates totalQuestions = 20 (got ${evaluation.totalQuestions})`);
  assert(evaluation.correct === 15, `Server calculates correct = 15 (got ${evaluation.correct})`);
  assert(evaluation.incorrect === 3, `Server calculates incorrect = 3 (got ${evaluation.incorrect})`);
  assert(evaluation.unattempted === 2, `Server calculates unattempted = 2 (got ${evaluation.unattempted})`);
  assert(evaluation.percentage === 75, `Server calculates percentage = 75% (got ${evaluation.percentage}%)`);

  // Now verify getTestResult returns explanations and correct answers after submission
  const resultReq = {
    params: { attemptId: activeAttemptId },
    user: mockUser
  };
  const resultRes = createMockRes();
  await userTestController.getTestResult(resultReq, resultRes, nextFn);

  assert(resultRes.statusCode === 200, 'getTestResult returns HTTP 200 after submission');
  const analysis = resultRes.body?.data?.questionAnalysis || [];
  assert(analysis.length === 20, 'Result question analysis contains all 20 questions');
  assert(analysis.every(q => q.correctAnswer && q.explanation), 'Correct answers and explanations are safely revealed in post-submission result');

  // ──────────────────────────────────────────────────────────
  // 9. Cross-User Privacy & Attempt Isolation
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 9] Cross-User Privacy & Attempt Isolation');

  const unauthorizedUser = {
    userId: new mongoose.Types.ObjectId(), // Different student
    role: 'student'
  };

  const snoopingReq = {
    params: { attemptId: activeAttemptId },
    user: unauthorizedUser
  };
  const snoopingRes = createMockRes();

  await userTestController.getTestResult(snoopingReq, snoopingRes, nextFn);
  assert(snoopingRes.statusCode === 404, 'User B cannot view User A\'s test attempt (HTTP 404/unauthorized returned)');

  // ──────────────────────────────────────────────────────────
  // 10. Invalid Submission Payloads
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 10] Invalid Submission Payloads');

  // Start another attempt for payload tests
  const testUser2 = { userId: new mongoose.Types.ObjectId(), role: 'student' };
  const startReq2 = { params: { testId: 'spotting-errors-test-1' }, user: testUser2 };
  const startRes2 = createMockRes();
  await userTestController.startTest(startReq2, startRes2, nextFn);
  const attempt2Id = startRes2.body?.data?.attemptId;

  // Invalid Option selected (e.g. "Z")
  const invalidOptReq = {
    params: { testId: 'spotting-errors-test-1' },
    body: {
      attemptId: attempt2Id,
      answers: [{ questionId: returnedQuestions[0]._id.toString(), selectedAnswer: 'Z' }]
    },
    user: testUser2
  };
  const invalidOptRes = createMockRes();
  await userTestController.submitTest(invalidOptReq, invalidOptRes, nextFn);
  assert(invalidOptRes.statusCode === 400, 'Rejects submission with invalid option key "Z" (HTTP 400)');

  // Invalid Question ID not in test
  const fakeQId = new mongoose.Types.ObjectId().toString();
  const invalidQIdReq = {
    params: { testId: 'spotting-errors-test-1' },
    body: {
      attemptId: attempt2Id,
      answers: [{ questionId: fakeQId, selectedAnswer: 'A' }]
    },
    user: testUser2
  };
  const invalidQIdRes = createMockRes();
  await userTestController.submitTest(invalidQIdReq, invalidQIdRes, nextFn);
  assert(invalidQIdRes.statusCode === 400, 'Rejects submission with question ID not belonging to test (HTTP 400)');

  // Repeated submission follows existing project contract (idempotent recovery with HTTP 200)
  const repeatSubmitRes = createMockRes();
  await userTestController.submitTest(submitReq, repeatSubmitRes, nextFn);
  assert(repeatSubmitRes.statusCode === 200 && repeatSubmitRes.body?.message === 'Test already submitted', 'Repeated submissions follow existing product contract (idempotent recovery with HTTP 200)');

  // Unpublished test start rejection (HTTP 403)
  await PracticeTest.create({
    testId: 'unpub-cds-test-sample',
    testName: 'Unpublished CDS Test',
    module: 'cds',
    section: 'grammar',
    subject: 'grammar',
    chapterSlug: 'spotting-errors',
    isAvailable: false,
    status: 'incomplete',
    questionCount: 20
  });
  const unpubReq = { params: { testId: 'unpub-cds-test-sample' }, user: mockUser };
  const unpubRes = createMockRes();
  await userTestController.startTest(unpubReq, unpubRes, nextFn);
  assert(unpubRes.statusCode === 403, 'Unpublished or unavailable test cannot be started by student (HTTP 403)');
  await PracticeTest.deleteOne({ testId: 'unpub-cds-test-sample' });

  // ──────────────────────────────────────────────────────────
  // 11. Existing Aptitude Module Regression Check
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 11] Existing Aptitude Module Regression Check');

  // Verify Aptitude requirements unchanged in TestStatusService
  const aptReqCheck = TestStatusService.validateRequirements('aptitude', 15, 0, 15, 15);
  assert(aptReqCheck.status === 'available', 'Aptitude test requirement check remains 15 questions = available');

  const aptFailCheck = TestStatusService.validateRequirements('aptitude', 14, 0, 14, 14);
  assert(aptFailCheck.status === 'incomplete', 'Aptitude test requirement check fails on 14 questions');

  // ──────────────────────────────────────────────────────────
  // 12. Admin Upload & Publishing Pipeline for CDS English
  // ──────────────────────────────────────────────────────────
  console.log('\n[Group 12] Admin Upload & Publishing Pipeline for CDS English');

  // 12.1 Valid CDS Grammar upload payload
  const validAdminGrammarPayload = {
    module: 'cds',
    subject: 'english',
    section: 'grammar',
    chapterSlug: 'spotting-errors',
    chapterName: 'Spotting Errors',
    testId: 'admin-upload-test-cds-1',
    testName: 'Admin Upload Test 1',
    testNumber: 99,
    questions: Array.from({ length: 20 }, (_, i) => createValidMCQ(i + 1))
  };
  const valAdminResult = await QuestionImportService.validateUpload(validAdminGrammarPayload, true);
  assert(valAdminResult.valid, 'Admin upload: Valid CDS Grammar JSON passes validation');
  assert(valAdminResult.summary?.module === 'cds', 'Admin upload: Summary records module as "cds"');
  assert(valAdminResult.summary?.section === 'grammar', 'Admin upload: Summary records section as "grammar"');
  assert(valAdminResult.summary?.totalQuestions === 20, 'Admin upload: Summary records totalQuestions = 20');

  // 12.2 Invalid CDS Grammar upload payload (18 questions)
  const invalidGrammar18 = {
    ...validAdminGrammarPayload,
    questions: validAdminGrammarPayload.questions.slice(0, 18)
  };
  const inv18Result = await QuestionImportService.validateUpload(invalidGrammar18, true);
  assert(!inv18Result.valid, 'Admin upload: Rejects Grammar JSON with 18 questions');
  assert(inv18Result.errors.some(e => e.message.includes('must contain exactly 20 questions; 18 were detected')), 'Admin upload: Error message reports: "must contain exactly 20 questions; 18 were detected"');

  // 12.3 Question with 3 options
  const invalidOptsPayload = {
    ...validAdminGrammarPayload,
    questions: [
      threeOpts,
      ...validAdminGrammarPayload.questions.slice(1)
    ]
  };
  const invOptsResult = await QuestionImportService.validateUpload(invalidOptsPayload, true);
  assert(!invOptsResult.valid, 'Admin upload: Rejects question with 3 options');
  assert(invOptsResult.errors.some(e => e.message.includes('Must contain exactly 4 options')), 'Admin upload: Error message reports: "Must contain exactly 4 options"');

  // 12.4 Question with missing correct answer
  const missingAnsPayload = {
    ...validAdminGrammarPayload,
    questions: [
      createValidMCQ(1, { correctAnswer: '' }),
      ...validAdminGrammarPayload.questions.slice(1)
    ]
  };
  const missAnsResult = await QuestionImportService.validateUpload(missingAnsPayload, true);
  assert(!missAnsResult.valid, 'Admin upload: Rejects question with missing correct answer');
  assert(missAnsResult.errors.some(e => e.message.includes('Correct answer must be one of')), 'Admin upload: Error message reports: "Correct answer must be one of"');

  // 12.5 Valid Synonyms & Antonyms upload (10+10)
  const validAdminSynAntPayload = {
    module: 'cds',
    subject: 'english',
    section: 'vocabulary',
    chapterSlug: 'synonyms-antonyms',
    chapterName: 'Synonyms & Antonyms',
    testId: 'admin-upload-test-cds-synant',
    testName: 'Admin Synonyms & Antonyms Test',
    testNumber: 99,
    questions: validSynAntQuestions
  };
  const valAdminSynAntResult = await QuestionImportService.validateUpload(validAdminSynAntPayload, true);
  assert(valAdminSynAntResult.valid, 'Admin upload: Valid Synonyms & Antonyms (10+10) passes validation');

  // 12.6 Invalid Synonyms & Antonyms upload (9+11)
  const invAdminSynAntResult = await QuestionImportService.validateUpload({
    ...validAdminSynAntPayload,
    questions: unevenSplitQuestions
  }, true);
  assert(!invAdminSynAntResult.valid, 'Admin upload: Rejects Synonyms & Antonyms with uneven 9+11 split');
  assert(invAdminSynAntResult.errors.some(e => e.message.includes('exactly 10 questions with subTopic: \'synonym\'')), 'Admin upload: Error explains 10+10 requirement');

  // 12.7 Valid Reading Comprehension upload (2 passages x 5 questions)
  const validAdminRCPayload = {
    module: 'cds',
    subject: 'english',
    section: 'reading-comprehension',
    chapterSlug: 'factual-comprehension',
    chapterName: 'Factual Comprehension',
    testId: 'admin-upload-test-cds-rc',
    testName: 'Admin RC Test',
    testNumber: 99,
    passages: [
      { number: 1, text: validPassage1 },
      { number: 2, text: validPassage2 }
    ],
    questions: validRCQuestions
  };
  const valAdminRCResult = await QuestionImportService.validateUpload(validAdminRCPayload, true);
  assert(valAdminRCResult.valid, 'Admin upload: Valid Reading Comprehension passes validation');

  // 12.8 Invalid Reading Comprehension upload (1 passage)
  const invAdminRCResult = await QuestionImportService.validateUpload({
    ...validAdminRCPayload,
    passages: [{ number: 1, text: validPassage1 }]
  }, true);
  assert(!invAdminRCResult.valid, 'Admin upload: Rejects Reading Comprehension with 1 passage');
  assert(invAdminRCResult.errors.some(e => e.message.includes('exactly 2 reading passages')), 'Admin upload: Error explains exactly 2 reading passages required');

  // 12.9 Execution: Import to database
  const importedSummary = await QuestionImportService.importValidatedQuestions(validAdminGrammarPayload, true);
  assert(importedSummary.testId === 'admin-upload-test-cds-1', 'Admin upload: Successfully executes import into database');

  // 12.10 Verify database persistence & PracticeTest availability
  const savedTestDoc = await PracticeTest.findOne({ testId: 'admin-upload-test-cds-1' });
  assert(!!savedTestDoc, 'Admin upload: PracticeTest document created in database');
  assert(savedTestDoc.module === 'cds', 'Admin upload: PracticeTest module is "cds"');
  assert(savedTestDoc.status === 'available', 'Admin upload: PracticeTest status is "available"');
  assert(savedTestDoc.isAvailable === true, 'Admin upload: PracticeTest isAvailable is true');

  // 12.11 Verify Question persistence
  const savedQuestionDocs = await CDSEnglishQuestion.find({ testId: 'admin-upload-test-cds-1' });
  assert(savedQuestionDocs.length === 20, 'Admin upload: Exactly 20 questions persisted in CDSEnglishQuestion');
  assert(savedQuestionDocs.every(q => q.section === 'grammar'), 'Admin upload: Questions have section set to "grammar"');

  // 12.12 Verify ImportHistory record
  const historyRecord = await ImportHistory.findOne({ testId: 'admin-upload-test-cds-1' });
  assert(!!historyRecord, 'Admin upload: ImportHistory audit record created');
  assert(historyRecord.status === 'REPLACED', 'Admin upload: ImportHistory status is REPLACED');

  // 12.13 Admin Test Details endpoint simulation
  const adminDetailsReq = {
    params: { id: savedTestDoc._id.toString() }
  };
  const adminDetailsRes = createMockRes();
  await adminTestController.getTestById(adminDetailsReq, adminDetailsRes, nextFn);
  assert(adminDetailsRes.statusCode === 200, 'Admin test details: getTestById returns HTTP 200');
  assert(adminDetailsRes.body?.data?.questions?.length === 20, 'Admin test details: Returns all 20 questions');

  // 12.14 Admin Authorization Guard (Role Middleware)
  let studentBlocked = false;
  const mockStudentReq = { user: { role: 'student' } };
  const mockStudentRes = createMockRes();
  const studentNext = (err) => { if (err) studentBlocked = true; };
  requireRole('admin')(mockStudentReq, mockStudentRes, studentNext);
  if (mockStudentRes.statusCode === 403 || studentBlocked) {
    assert(true, 'Admin security: Ordinary student role cannot access admin import routes (HTTP 403 / Forbidden)');
  } else {
    assert(false, 'Admin security: Ordinary student role was NOT blocked');
  }

  // 12.15 Clean up admin upload test documents
  await CDSEnglishQuestion.deleteMany({ testId: 'admin-upload-test-cds-1' });
  await PracticeTest.deleteOne({ testId: 'admin-upload-test-cds-1' });
  await ImportHistory.deleteOne({ testId: 'admin-upload-test-cds-1' });

  // Clean up temporary test attempt records
  await TestAttempt.deleteMany({ userId: { $in: [mockUser.userId, unauthorizedUser.userId, testUser2.userId] } });

  console.log('\n====================================================');
  console.log(`TEST RUN SUMMARY: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log('====================================================\n');

  await mongoose.disconnect();
  process.exit(failedTests > 0 ? 1 : 0);
}

runTestSuite().catch(err => {
  console.error('Test Suite encountered fatal error:', err);
  process.exit(1);
});
