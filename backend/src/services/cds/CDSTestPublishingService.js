// ============================================================
// PREORBIT — CDS Test Publishing Service
// ============================================================
// Handles atomic validation and publication of CDS English tests.
// Enforces strict composition, question structure, and safe
// staged rollback to prevent partial writes.
// ============================================================

const mongoose = require('mongoose');
const CDSEnglishQuestion = require('../../models/cds/CDSEnglishQuestion');
const PracticeTest = require('../../models/PracticeTest');
const CDSTestValidationService = require('./CDSTestValidationService');
const TestStatusService = require('../admin/TestStatusService');

class CDSTestPublishingService {

  /**
   * Validates and publishes a complete CDS English test.
   * If any validation fails, zero database writes are performed.
   * If database persistence fails midway, staged rollback cleans up writes.
   */
  async publishTest(testPayload, isReplace = false) {
    if (!testPayload || typeof testPayload !== 'object') {
      throw new Error('Invalid test payload: Must be a non-empty object');
    }

    const {
      module: mod = 'cds',
      section,
      chapterSlug,
      testId,
      testName,
      testNumber,
      chapterName,
      questions,
      passages
    } = testPayload;

    const payloadForValidation = {
      ...testPayload,
      module: 'cds',
      section: section || testPayload.subject
    };

    // 1. Strict In-Memory Validation (Zero DB writes if invalid)
    const validation = CDSTestValidationService.validateCDSTest(payloadForValidation);
    if (!validation.valid) {
      const err = new Error(`CDS Test Validation Failed: ${validation.errors.join('; ')}`);
      err.validationErrors = validation.errors;
      err.status = 400;
      throw err;
    }

    // 2. Check test existence
    const existingTest = await PracticeTest.findOne({ chapterSlug, testId });
    if (existingTest && !isReplace) {
      const err = new Error(`Test with ID "${testId}" already exists for chapter "${chapterSlug}".`);
      err.status = 409;
      throw err;
    }

    // 3. Staged / Transactional Persistence
    const cleanSection = section || testPayload.subject;
    const docsToInsert = questions.map((q, idx) => {
      const doc = {
        question: q.question.trim(),
        options: q.options.map(opt => ({
          key: opt.key.trim().toUpperCase(),
          text: opt.text.trim()
        })),
        correctAnswer: q.correctAnswer.trim().toUpperCase(),
        section: cleanSection,
        chapterSlug: chapterSlug.toLowerCase().trim(),
        testId: testId.trim(),
        questionType: 'mcq',
        marks: 1,
        explanation: q.explanation.trim(),
        difficulty: q.difficulty || 'medium',
        subTopic: q.subTopic ? q.subTopic.trim().toLowerCase() : null,
        passageNumber: q.passageNumber ? Number(q.passageNumber) : null,
        passageText: q.passageText ? q.passageText.trim() : null,
        passageTitle: q.passageTitle ? q.passageTitle.trim() : null
      };

      // For reading comprehension, attach passage text from passages array if needed
      if (cleanSection === 'reading-comprehension' && !doc.passageText && passages && doc.passageNumber) {
        const pObj = passages[doc.passageNumber - 1];
        if (pObj && pObj.text) {
          doc.passageText = pObj.text.trim();
          doc.passageTitle = pObj.title ? pObj.title.trim() : `Passage ${doc.passageNumber}`;
        }
      }

      return doc;
    });

    // Check if MongoDB session / transaction is supported
    let session = null;
    let useTransaction = false;
    try {
      session = await mongoose.startSession();
      session.startTransaction();
      useTransaction = true;
    } catch (sessionErr) {
      // Standalone MongoDB or environment without replica set
      useTransaction = false;
      if (session) {
        try { session.endSession(); } catch (e) {}
        session = null;
      }
    }

    try {
      const sessionOpt = useTransaction ? { session } : {};

      if (isReplace) {
        await CDSEnglishQuestion.deleteMany({ chapterSlug, testId }, sessionOpt);
      }

      // Insert questions
      await CDSEnglishQuestion.insertMany(docsToInsert, sessionOpt);

      // Upsert PracticeTest document with status 'available'
      const totalCount = docsToInsert.length;
      await PracticeTest.findOneAndUpdate(
        { chapterSlug, testId },
        {
          module: 'cds',
          subject: cleanSection,
          section: cleanSection,
          chapterSlug,
          testId,
          testName: testName || `${chapterSlug} - ${testId}`,
          ...(testNumber !== undefined && { testNumber }),
          ...(chapterName !== undefined && { chapterName }),
          questionCount: totalCount,
          multipleChoiceCount: 0,
          mcqCount: totalCount,
          totalMarks: totalCount,
          status: 'available',
          isAvailable: true,
          configuration: {
            totalQuestions: totalCount,
            totalMarks: totalCount,
            questionTypes: {
              multipleChoice: 0,
              mcq: totalCount
            },
            marksPerQuestion: 1
          }
        },
        { new: true, upsert: true, ...sessionOpt }
      );

      if (useTransaction) {
        await session.commitTransaction();
      }

      return {
        success: true,
        message: `CDS test "${testId}" successfully published with ${totalCount} valid questions.`,
        testId,
        chapterSlug,
        section: cleanSection,
        testName,
        questionCount: totalCount,
        status: 'available'
      };

    } catch (persistenceError) {
      // Staged Rollback if transaction was not used or failed
      if (useTransaction && session) {
        try { await session.abortTransaction(); } catch (e) {}
      } else {
        // Safe staged cleanup for standalone DB: remove any partially written questions
        try {
          await CDSEnglishQuestion.deleteMany({ chapterSlug, testId });
          await PracticeTest.deleteOne({ chapterSlug, testId, status: 'draft' });
        } catch (cleanupErr) {
          console.error('[CDS-ROLLBACK-ERROR] Cleanup failed:', cleanupErr);
        }
      }

      throw persistenceError;
    } finally {
      if (session) {
        try { session.endSession(); } catch (e) {}
      }
    }
  }
}

module.exports = new CDSTestPublishingService();
