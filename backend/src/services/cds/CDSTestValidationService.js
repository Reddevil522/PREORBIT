// ============================================================
// PREORBIT — CDS Test Validation Service
// ============================================================
// Enforces strict composition, question structure, option
// validation, and section rules for all CDS English tests:
//   - Grammar: exactly 20 MCQs
//   - Combined Synonyms & Antonyms: exactly 20 MCQs (10 Syn + 10 Ant)
//   - Other Vocabulary: exactly 20 MCQs
//   - Reading Comprehension: exactly 10 MCQs (2 passages x 5 MCQs)
// ============================================================

const grammarChapters = [
  'spotting-errors',
  'sentence-improvement',
  'prepositions-determiners',
  'parts-of-speech',
  'active-passive-voice',
  'direct-indirect-speech',
  'fill-in-the-blanks',
  'ordering-of-words',
  'ordering-of-sentences'
];

const vocabularyChapters = [
  'synonyms-antonyms',
  'idioms-phrases',
  'one-word-substitution',
  'spelling-master',
  'cloze-composition',
  'word-usage'
];

const rcChapters = [
  'factual-comprehension',
  'inferential-comprehension',
  'tone-and-theme',
  'contextual-vocabulary'
];

class CDSTestValidationService {

  /**
   * Validates a single MCQ question structure according to CDS requirements.
   * Every question must have exactly 4 options A/B/C/D and single correctAnswer.
   */
  validateMCQQuestion(q, index = 1) {
    const errors = [];
    const qLabel = `Question ${index}`;

    if (!q || typeof q !== 'object') {
      errors.push(`${qLabel}: Question object is invalid or empty.`);
      return errors;
    }

    // 1. Question Text
    if (!q.question || typeof q.question !== 'string' || q.question.trim().length < 5) {
      errors.push(`${qLabel}: Question text must be at least 5 characters.`);
    }

    // 2. Options validation (exactly 4 options A, B, C, D)
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`${qLabel}: Must contain exactly 4 options (found ${q.options ? q.options.length : 0}).`);
    } else {
      const keysSeen = new Set();
      q.options.forEach((opt, optIdx) => {
        const optLetter = ['A', 'B', 'C', 'D'][optIdx];
        if (!opt.key || !['A', 'B', 'C', 'D'].includes(opt.key)) {
          errors.push(`${qLabel} Option ${optIdx + 1}: Invalid option key "${opt.key}". Must be A, B, C, or D.`);
        } else {
          if (keysSeen.has(opt.key)) {
            errors.push(`${qLabel}: Duplicate option key "${opt.key}".`);
          }
          keysSeen.add(opt.key);
        }

        if (!opt.text || typeof opt.text !== 'string' || opt.text.trim().length === 0) {
          errors.push(`${qLabel} Option ${opt.key || optLetter}: Option text cannot be empty.`);
        }
      });

      if (keysSeen.size !== 4 || !['A', 'B', 'C', 'D'].every(k => keysSeen.has(k))) {
        errors.push(`${qLabel}: Options must uniquely and completely provide keys A, B, C, and D.`);
      }
    }

    // 3. Correct Answer validation
    if (!q.correctAnswer || !['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
      errors.push(`${qLabel}: Correct answer must be one of 'A', 'B', 'C', or 'D'. Found: "${q.correctAnswer}".`);
    } else if (Array.isArray(q.options)) {
      const matchingOpt = q.options.find(o => o.key === q.correctAnswer);
      if (!matchingOpt) {
        errors.push(`${qLabel}: Correct answer "${q.correctAnswer}" does not match any provided option key.`);
      }
    }

    // 4. Explanation validation
    if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length < 5) {
      errors.push(`${qLabel}: Explanation must be provided and contain at least 5 characters.`);
    }

    // 5. Marks validation
    if (q.marks !== undefined && q.marks !== 1) {
      errors.push(`${qLabel}: Marks must be exactly 1.`);
    }

    // 6. Question Type
    if (q.questionType && q.questionType !== 'mcq') {
      errors.push(`${qLabel}: CDS English only supports single-choice 'mcq' questions.`);
    }

    return errors;
  }

  /**
   * Validates a complete CDS Grammar Test (strictly 20 MCQs).
   */
  validateGrammarTest(metadata, questions) {
    const errors = [];

    if (!grammarChapters.includes(metadata.chapterSlug)) {
      errors.push(`Invalid chapterSlug "${metadata.chapterSlug}" for section "grammar". Valid chapters: ${grammarChapters.join(', ')}.`);
    }

    if (!Array.isArray(questions)) {
      errors.push('Test questions must be provided as an array.');
      return errors;
    }

    if (questions.length !== 20) {
      errors.push(`Grammar tests must contain exactly 20 questions. Found: ${questions.length}.`);
    }

    questions.forEach((q, idx) => {
      errors.push(...this.validateMCQQuestion(q, idx + 1));
    });

    return errors;
  }

  /**
   * Validates a complete CDS Vocabulary Test (strictly 20 MCQs).
   * For 'synonyms-antonyms', enforces exactly 10 Synonyms + 10 Antonyms using explicit subTopic.
   */
  validateVocabularyTest(metadata, questions) {
    const errors = [];

    if (!vocabularyChapters.includes(metadata.chapterSlug)) {
      errors.push(`Invalid chapterSlug "${metadata.chapterSlug}" for section "vocabulary". Valid chapters: ${vocabularyChapters.join(', ')}.`);
    }

    if (!Array.isArray(questions)) {
      errors.push('Test questions must be provided as an array.');
      return errors;
    }

    if (questions.length !== 20) {
      errors.push(`Vocabulary tests must contain exactly 20 questions. Found: ${questions.length}.`);
    }

    // Combined Synonyms & Antonyms verification
    if (metadata.chapterSlug === 'synonyms-antonyms') {
      let synonymCount = 0;
      let antonymCount = 0;
      const unclassified = [];

      questions.forEach((q, idx) => {
        const qNum = idx + 1;
        const sub = q.subTopic ? String(q.subTopic).toLowerCase().trim() : null;
        
        if (sub === 'synonym') {
          synonymCount++;
        } else if (sub === 'antonym') {
          antonymCount++;
        } else {
          unclassified.push(qNum);
        }

        // Validate individual question
        errors.push(...this.validateMCQQuestion(q, qNum));
      });

      if (unclassified.length > 0) {
        errors.push(`Synonyms & Antonyms test has questions with missing or invalid subTopic (questions: ${unclassified.join(', ')}). Must be explicitly 'synonym' or 'antonym'.`);
      }

      if (synonymCount !== 10) {
        errors.push(`Synonyms & Antonyms test must have exactly 10 questions with subTopic: 'synonym'. Found: ${synonymCount}.`);
      }

      if (antonymCount !== 10) {
        errors.push(`Synonyms & Antonyms test must have exactly 10 questions with subTopic: 'antonym'. Found: ${antonymCount}.`);
      }

    } else {
      // Other vocabulary chapters
      questions.forEach((q, idx) => {
        errors.push(...this.validateMCQQuestion(q, idx + 1));
      });
    }

    return errors;
  }

  /**
   * Validates a complete CDS Reading Comprehension Test (strictly 10 MCQs, 2 passages x 5 questions).
   */
  validateReadingComprehensionTest(metadata, questions, passages = []) {
    const errors = [];

    if (!rcChapters.includes(metadata.chapterSlug)) {
      errors.push(`Invalid chapterSlug "${metadata.chapterSlug}" for section "reading-comprehension". Valid chapters: ${rcChapters.join(', ')}.`);
    }

    if (!Array.isArray(questions)) {
      errors.push('Test questions must be provided as an array.');
      return errors;
    }

    if (questions.length !== 10) {
      errors.push(`Reading Comprehension tests must contain exactly 10 questions. Found: ${questions.length}.`);
    }

    if (Array.isArray(passages) && passages.length > 0 && passages.length !== 2) {
      errors.push(`Reading Comprehension tests must have exactly 2 reading passages. Found: ${passages.length}.`);
    }

    let passage1Questions = 0;
    let passage2Questions = 0;
    const invalidPassageRefs = [];

    questions.forEach((q, idx) => {
      const qNum = idx + 1;
      const pNum = Number(q.passageNumber);

      if (pNum === 1) {
        passage1Questions++;
      } else if (pNum === 2) {
        passage2Questions++;
      } else {
        invalidPassageRefs.push(qNum);
      }

      // Check passageText is present on question or in separate passages array
      const hasPassageText = (q.passageText && q.passageText.trim().length > 20) ||
                             (passages && passages[pNum - 1] && passages[pNum - 1].text && passages[pNum - 1].text.trim().length > 20);

      if (!hasPassageText) {
        errors.push(`Question ${qNum}: Reading passage text is missing or shorter than 20 characters.`);
      }

      errors.push(...this.validateMCQQuestion(q, qNum));
    });

    if (invalidPassageRefs.length > 0) {
      errors.push(`Questions with invalid or missing passageNumber: ${invalidPassageRefs.join(', ')}. Must be 1 or 2.`);
    }

    if (passage1Questions !== 5) {
      errors.push(`Passage 1 must have exactly 5 associated questions. Found: ${passage1Questions}.`);
    }

    if (passage2Questions !== 5) {
      errors.push(`Passage 2 must have exactly 5 associated questions. Found: ${passage2Questions}.`);
    }

    return errors;
  }

  /**
   * Master validation dispatcher.
   */
  validateCDSTest(testData) {
    const { module: mod, section, chapterSlug, testId, testName, questions, passages } = testData || {};
    const errors = [];

    if (!testData || typeof testData !== 'object') {
      return { valid: false, errors: ['Invalid test payload: Must be a non-empty object.'] };
    }

    if (mod !== 'cds') {
      errors.push(`Invalid module "${mod}". Must be "cds".`);
    }

    if (!section || !['grammar', 'vocabulary', 'reading-comprehension'].includes(section)) {
      errors.push(`Invalid or missing section "${section}". Must be "grammar", "vocabulary", or "reading-comprehension".`);
    }

    if (!testId || typeof testId !== 'string' || testId.trim().length < 3) {
      errors.push('Missing or invalid testId.');
    }

    if (!testName || typeof testName !== 'string' || testName.trim().length < 3) {
      errors.push('Missing or invalid testName.');
    }

    if (!chapterSlug) {
      errors.push('Missing chapterSlug.');
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    const metadata = { module: mod, section, chapterSlug, testId, testName };

    switch (section) {
      case 'grammar':
        errors.push(...this.validateGrammarTest(metadata, questions));
        break;
      case 'vocabulary':
        errors.push(...this.validateVocabularyTest(metadata, questions));
        break;
      case 'reading-comprehension':
        errors.push(...this.validateReadingComprehensionTest(metadata, questions, passages));
        break;
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

module.exports = new CDSTestValidationService();
