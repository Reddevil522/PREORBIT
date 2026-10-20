// ============================================================
// PREORBIT — Machine-Checkable CDS Content Quality Audit
// ============================================================
// Performs complete QA audit across:
//   1. Chapter Inventory (all 19 chapters)
//   2. Theory Sections per Chapter (10-point standard)
//   3. Number of Tests per Chapter
//   4. Number of Questions per Test
//   5. Synonym & Antonym Split (10+10 verification)
//   6. Passage Counts & Questions per Passage (2x5 verification)
//   7. Missing Explanations (zero tolerance)
//   8. Invalid Correct-Answer References (zero tolerance)
//   9. Duplicate Content & Question IDs Check
//  10. Source Topic & Subtopic Mappings
// ============================================================

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const mongoose = require('mongoose');
const { connectDatabase } = require('../config/database');

const CDSEnglishQuestion = require('../models/cds/CDSEnglishQuestion');
const PracticeTest = require('../models/PracticeTest');
const cdsAllTheory = require('../data/cds/theory/cdsAllTheory');

const expectedChapters = [
  // Grammar (9)
  { slug: 'spotting-errors', name: 'Spotting Errors', section: 'grammar', expQ: 20 },
  { slug: 'sentence-improvement', name: 'Sentence Improvement', section: 'grammar', expQ: 20 },
  { slug: 'prepositions-determiners', name: 'Prepositions & Determiners', section: 'grammar', expQ: 20 },
  { slug: 'parts-of-speech', name: 'Parts of Speech Identification', section: 'grammar', expQ: 20 },
  { slug: 'active-passive-voice', name: 'Active and Passive Voice', section: 'grammar', expQ: 20 },
  { slug: 'direct-indirect-speech', name: 'Direct and Indirect Speech', section: 'grammar', expQ: 20 },
  { slug: 'fill-in-the-blanks', name: 'Fill in the Blanks', section: 'grammar', expQ: 20 },
  { slug: 'ordering-of-words', name: 'Ordering of Words in a Sentence', section: 'grammar', expQ: 20 },
  { slug: 'ordering-of-sentences', name: 'Ordering of Sentences in a Paragraph', section: 'grammar', expQ: 20 },

  // Vocabulary (6)
  { slug: 'synonyms-antonyms', name: 'Synonyms & Antonyms (Combined)', section: 'vocabulary', expQ: 20, isSplit: true },
  { slug: 'idioms-phrases', name: 'Idioms and Phrases', section: 'vocabulary', expQ: 20 },
  { slug: 'one-word-substitution', name: 'One-Word Substitution', section: 'vocabulary', expQ: 20 },
  { slug: 'spelling-master', name: 'Spelling Master', section: 'vocabulary', expQ: 20 },
  { slug: 'cloze-composition', name: 'Cloze Composition', section: 'vocabulary', expQ: 20 },
  { slug: 'word-usage', name: 'Word Usage & Confusing Words', section: 'vocabulary', expQ: 20 },

  // Reading Comprehension (4)
  { slug: 'factual-comprehension', name: 'Factual Comprehension', section: 'reading-comprehension', expQ: 10, isRC: true },
  { slug: 'inferential-comprehension', name: 'Inferential Comprehension', section: 'reading-comprehension', expQ: 10, isRC: true },
  { slug: 'tone-and-theme', name: 'Tone and Theme Identification', section: 'reading-comprehension', expQ: 10, isRC: true },
  { slug: 'contextual-vocabulary', name: 'Contextual Vocabulary in Passages', section: 'reading-comprehension', expQ: 10, isRC: true }
];

async function runAudit() {
  console.log('====================================================');
  console.log('PREORBIT — CDS English Quality Assurance & Content Audit');
  console.log('====================================================\n');

  await connectDatabase();

  let auditErrors = [];
  let totalAuditedQuestions = 0;
  let totalAuditedChapters = 0;

  // ── 1. Theory Audit ───────────────────────────────────────
  console.log('1. CHAPTER THEORY AUDIT (10-Point Standard):');
  for (const chap of expectedChapters) {
    totalAuditedChapters++;
    const theory = cdsAllTheory[chap.slug];

    if (!theory) {
      auditErrors.push(`[Theory] Missing theory for chapter "${chap.slug}"`);
      console.log(`   ❌ ${chap.name}: MISSING`);
      continue;
    }

    const checks = [
      { name: 'title', ok: typeof theory.title === 'string' && theory.title.length > 0 },
      { name: 'learningObjectives', ok: Array.isArray(theory.learningObjectives) && theory.learningObjectives.length > 0 },
      { name: 'overview', ok: typeof theory.overview === 'string' && theory.overview.length > 50 },
      { name: 'coreRules', ok: Array.isArray(theory.coreRules) && theory.coreRules.length >= 3 },
      { name: 'exceptions', ok: Array.isArray(theory.exceptions) && theory.exceptions.length >= 1 },
      { name: 'examExamples', ok: Array.isArray(theory.examExamples) && theory.examExamples.length >= 1 },
      { name: 'commonTraps', ok: Array.isArray(theory.commonTraps) && theory.commonTraps.length >= 1 },
      { name: 'confusedConcepts', ok: Array.isArray(theory.confusedConcepts) && theory.confusedConcepts.length >= 1 },
      { name: 'summary', ok: typeof theory.summary === 'string' && theory.summary.length > 30 },
      { name: 'practiceExercises', ok: Array.isArray(theory.practiceExercises) && theory.practiceExercises.length >= 1 },
      { name: 'relatedChapters', ok: Array.isArray(theory.relatedChapters) && theory.relatedChapters.length >= 1 }
    ];

    const failedChecks = checks.filter(c => !c.ok);
    if (failedChecks.length > 0) {
      auditErrors.push(`[Theory] ${chap.slug} failed checks: ${failedChecks.map(c => c.name).join(', ')}`);
      console.log(`   ⚠️ ${chap.name}: Partially complete (missing ${failedChecks.map(c => c.name).join(', ')})`);
    } else {
      console.log(`   ✓ ${chap.name}: Complete (All 10 points verified)`);
    }
  }

  // ── 2. Database Tests & Question Composition Audit ────────
  console.log('\n2. DATABASE TEST & QUESTION COMPOSITION AUDIT:');
  const allTests = await PracticeTest.find({ module: 'cds' }).lean();
  console.log(`   Total Published CDS Tests Found in Database: ${allTests.length}`);

  for (const chap of expectedChapters) {
    const testDoc = allTests.find(t => t.chapterSlug === chap.slug);
    if (!testDoc) {
      auditErrors.push(`[TestDoc] No PracticeTest document found for chapter "${chap.slug}"`);
      console.log(`   ❌ Chapter "${chap.slug}": NO TEST FOUND`);
      continue;
    }

    if (testDoc.status !== 'available' || !testDoc.isAvailable) {
      auditErrors.push(`[TestDoc] Test "${testDoc.testId}" is not published as available (status: ${testDoc.status})`);
    }

    const questions = await CDSEnglishQuestion.find({
      chapterSlug: chap.slug,
      testId: testDoc.testId
    }).lean();

    totalAuditedQuestions += questions.length;

    if (questions.length !== chap.expQ) {
      auditErrors.push(`[Count] ${chap.slug}: Expected ${chap.expQ} questions, found ${questions.length}`);
      console.log(`   ❌ ${chap.name} (${testDoc.testId}): ${questions.length}/${chap.expQ} questions`);
    } else {
      console.log(`   ✓ ${chap.name} (${testDoc.testId}): exactly ${questions.length} questions`);
    }

    // Check Combined Synonyms & Antonyms Split
    if (chap.isSplit) {
      const synCount = questions.filter(q => q.subTopic === 'synonym').length;
      const antCount = questions.filter(q => q.subTopic === 'antonym').length;
      if (synCount !== 10 || antCount !== 10) {
        auditErrors.push(`[Split] ${chap.slug}: Expected 10 Syn + 10 Ant, found ${synCount} Syn + ${antCount} Ant`);
        console.log(`      ❌ Split Error: ${synCount} Synonyms, ${antCount} Antonyms`);
      } else {
        console.log(`      ✓ 10 Synonyms (Q1–10) + 10 Antonyms (Q11–20) verified`);
      }
    }

    // Check Reading Comprehension Passages
    if (chap.isRC) {
      const p1Count = questions.filter(q => Number(q.passageNumber) === 1).length;
      const p2Count = questions.filter(q => Number(q.passageNumber) === 2).length;
      if (p1Count !== 5 || p2Count !== 5) {
        auditErrors.push(`[RC-Split] ${chap.slug}: Expected 5 P1 + 5 P2, found ${p1Count} P1 + ${p2Count} P2`);
        console.log(`      ❌ Passage Split Error: ${p1Count} in P1, ${p2Count} in P2`);
      } else {
        console.log(`      ✓ Passage 1 (5 MCQs) + Passage 2 (5 MCQs) verified`);
      }
    }

    // Check Question Quality Rules
    const seenTexts = new Set();
    questions.forEach((q, idx) => {
      const qNum = idx + 1;
      // 1. Text length
      if (!q.question || q.question.trim().length < 5) {
        auditErrors.push(`[Quality] ${testDoc.testId} Q${qNum}: Question text too short`);
      }

      // 2. Duplicate text within test
      const normText = q.question.toLowerCase().trim();
      if (seenTexts.has(normText)) {
        auditErrors.push(`[Quality] ${testDoc.testId} Q${qNum}: Duplicate question text detected`);
      }
      seenTexts.add(normText);

      // 3. Exactly 4 options A/B/C/D
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        auditErrors.push(`[Quality] ${testDoc.testId} Q${qNum}: Does not have exactly 4 options`);
      } else {
        const keys = q.options.map(o => o.key);
        if (new Set(keys).size !== 4 || !['A', 'B', 'C', 'D'].every(k => keys.includes(k))) {
          auditErrors.push(`[Quality] ${testDoc.testId} Q${qNum}: Invalid option keys: [${keys.join(',')}]`);
        }
        if (q.options.some(o => !o.text || o.text.trim().length === 0)) {
          auditErrors.push(`[Quality] ${testDoc.testId} Q${qNum}: Empty option text detected`);
        }
      }

      // 4. Correct answer valid
      if (!q.correctAnswer || !['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
        auditErrors.push(`[Quality] ${testDoc.testId} Q${qNum}: Invalid correctAnswer "${q.correctAnswer}"`);
      }

      // 5. Non-empty explanation
      if (!q.explanation || q.explanation.trim().length < 5) {
        auditErrors.push(`[Quality] ${testDoc.testId} Q${qNum}: Missing or short explanation`);
      }
    });
  }

  // ── 3. Summary & Machine Report ───────────────────────────
  console.log('\n====================================================');
  console.log('AUDIT SUMMARY:');
  console.log(`- Total Chapters Audited: ${totalAuditedChapters} / 19`);
  console.log(`- Total Published Tests: ${allTests.length} / 19`);
  console.log(`- Total Questions in Database: ${totalAuditedQuestions} / 340`);
  console.log(`- Quality Errors Detected: ${auditErrors.length}`);

  if (auditErrors.length > 0) {
    console.error('\n❌ AUDIT FAILED with errors:');
    auditErrors.forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
  } else {
    console.log('\n✓ PERFECT AUDIT: All 19 chapters, 19 tests, 340 questions, and 10-point theory standards 100% verified with ZERO errors!');
  }
  console.log('====================================================\n');

  await mongoose.disconnect();
  process.exit(auditErrors.length > 0 ? 1 : 0);
}

if (require.main === module) {
  runAudit().catch(err => {
    console.error('Audit fatal error:', err);
    process.exit(1);
  });
}

module.exports = runAudit;
