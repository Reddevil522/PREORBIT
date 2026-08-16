const JavaDSAQuestion = require('../../models/java-dsa/JavaDSAQuestion');
const AptitudeQuestion = require('../../models/aptitude/AptitudeQuestion');
const OOPQuestion = require('../../models/core-cs/OOPQuestion');
const DBMSQuestion = require('../../models/core-cs/DBMSQuestion');
const OSQuestion = require('../../models/core-cs/OSQuestion');
const CNQuestion = require('../../models/core-cs/CNQuestion');
const SQLQuestion = require('../../models/core-cs/SQLQuestion');
const TestStatusService = require('./TestStatusService');
const PracticeTest = require('../../models/PracticeTest');
const ImportHistory = require('../../models/admin/ImportHistory');

const mongoose = require('mongoose');

function normalizeQuestionKey(questionText, moduleName, subject, chapterSlug, testId) {
  const normalizedText = (questionText || '').toLowerCase().replace(/\s+/g, ' ').trim();
  return `${moduleName}:${subject || ''}:${chapterSlug}:${testId}:${normalizedText}`;
}

class QuestionImportService {
  async validateUpload(jsonObj, isReplace = false) {
    console.log('[VALIDATION] JSON parsing started'); // Log for testing
    console.log('[VALIDATION] JSON parsing completed'); // Log for testing
    console.log('[VALIDATION] Metadata validation started');
    const errors = [];

    if (!jsonObj || typeof jsonObj !== 'object' || Array.isArray(jsonObj)) {
      errors.push({ questionNumber: 'Root', field: 'Syntax', message: 'Upload format invalid: Must be a JSON object containing module and questions' });
      return { valid: false, errors };
    }

    const { module: moduleName, subject, chapterSlug, testId, testNumber, chapterName, questions } = jsonObj;

    if (!moduleName) errors.push({ questionNumber: 'Metadata', field: 'module', message: 'Missing "module"' });
    if (!testId) errors.push({ questionNumber: 'Metadata', field: 'testId', message: 'Missing "testId"' });
    if (!questions || !Array.isArray(questions)) {
      errors.push({ questionNumber: 'Metadata', field: 'questions', message: 'Missing or invalid "questions" array' });
      return { valid: false, errors };
    }

    let Model;
    if (moduleName === 'java-dsa') {
      if (!chapterSlug) errors.push({ questionNumber: 'Metadata', field: 'chapterSlug', message: 'Missing "chapterSlug" for java-dsa' });
      Model = JavaDSAQuestion;
    } else if (moduleName === 'aptitude') {
      if (!subject || !['quantitative', 'logical-reasoning'].includes(subject)) {
        errors.push({ questionNumber: 'Metadata', field: 'subject', message: 'Invalid or missing section/subject for aptitude. Must be "quantitative" or "logical-reasoning"' });
      }
      if (!chapterSlug) errors.push({ questionNumber: 'Metadata', field: 'chapterSlug', message: 'Missing "chapterSlug" for aptitude' });
      Model = AptitudeQuestion;
    } else if (moduleName === 'core-cs') {
      if (!subject) errors.push({ questionNumber: 'Metadata', field: 'subject', message: 'Missing "subject" for core-cs' });
      if (!chapterSlug) errors.push({ questionNumber: 'Metadata', field: 'chapterSlug', message: 'Missing "chapterSlug" for core-cs' });
      
      const coreCsModels = {
        'oop': OOPQuestion,
        'dbms': DBMSQuestion,
        'operating-system': OSQuestion,
        'computer-networks': CNQuestion,
        'sql': SQLQuestion
      };
      
      Model = coreCsModels[subject];
      if (subject && !Model) {
        errors.push({ questionNumber: 'Metadata', field: 'subject', message: `Invalid subject "${subject}" for core-cs` });
      }
    } else if (moduleName) {
      errors.push({ questionNumber: 'Metadata', field: 'module', message: `Invalid module "${moduleName}"` });
    }
    // Return early if metadata is wrong (to avoid DB queries)
    if (errors.length > 0) {
       console.log('[VALIDATION] Metadata validation completed (Failed)');
       return { valid: false, errors };
    }
    console.log('[VALIDATION] Metadata validation completed');
    console.log('[VALIDATION] Question validation started');
    const totalQuestions = questions.length;
    let multipleChoiceCount = 0;
    let mcqCount = 0;

    const inMemoryKeys = new Set();
    const uploadedQuestionTexts = [];

    if (moduleName === 'java-dsa' || moduleName === 'core-cs') {
      if (totalQuestions !== 25) {
        errors.push({ questionNumber: 'Composition', field: 'totalQuestions', message: `${moduleName} tests must contain exactly 25 questions. Found ${totalQuestions}.` });
      }
    } else if (moduleName === 'aptitude') {
      if (totalQuestions !== 15) {
        errors.push({ questionNumber: 'Composition', field: 'totalQuestions', message: `Aptitude tests must contain exactly 15 questions. Found ${totalQuestions}.` });
      }
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const qNum = i + 1;
      
      if (q.questionType === 'multiple-choice') multipleChoiceCount++;
      else mcqCount++;

      if (!q.question) {
        errors.push({ questionNumber: qNum, field: 'question', message: `Missing question text` });
      } else {
        uploadedQuestionTexts.push(q.question);
        const key = normalizeQuestionKey(q.question, moduleName, subject, chapterSlug, testId);
        if (inMemoryKeys.has(key)) {
           errors.push({ questionNumber: qNum, field: 'question', message: `Duplicate question found in uploaded JSON` });
        }
        inMemoryKeys.add(key);
      }

      if (q.marks !== 1) errors.push({ questionNumber: qNum, field: 'marks', message: `Marks must be exactly 1` });
      
      if (!q.options || !Array.isArray(q.options) || q.options.length === 0) {
        errors.push({ questionNumber: qNum, field: 'options', message: `Must have options array` });
        continue;
      }

      const optionKeys = new Set();
      for (let j = 0; j < q.options.length; j++) {
        const opt = q.options[j];
        if (!opt.key || !opt.text || opt.text.trim() === '') {
          errors.push({ questionNumber: qNum, field: 'options', message: `Option key and text must not be empty` });
        }
        if (opt.key && optionKeys.has(opt.key)) {
          errors.push({ questionNumber: qNum, field: 'options', message: `Option keys must be unique. Duplicate: ${opt.key}` });
        }
        if (opt.key) optionKeys.add(opt.key);
      }

      if (moduleName === 'aptitude') {
        if (!q.correctAnswer) {
          errors.push({ questionNumber: qNum, field: 'correctAnswer', message: `Missing correctAnswer` });
        } else if (!optionKeys.has(q.correctAnswer)) {
          errors.push({ questionNumber: qNum, field: 'correctAnswer', message: `Invalid correctAnswer "${q.correctAnswer}" (must match an option key)` });
        }
      } else if (moduleName === 'java-dsa' || moduleName === 'core-cs') {
        if (q.questionType !== 'mcq' && q.questionType !== 'multiple-choice') {
          errors.push({ questionNumber: qNum, field: 'questionType', message: `Invalid questionType "${q.questionType}"` });
        }

        if (q.questionType === 'mcq') {
          if (!q.correctAnswer) {
            errors.push({ questionNumber: qNum, field: 'correctAnswer', message: `Missing correctAnswer for mcq` });
          } else if (!optionKeys.has(q.correctAnswer)) {
            errors.push({ questionNumber: qNum, field: 'correctAnswer', message: `Invalid correctAnswer "${q.correctAnswer}"` });
          }
        } else if (q.questionType === 'multiple-choice') {
          if (!q.correctAnswers || !Array.isArray(q.correctAnswers) || q.correctAnswers.length === 0) {
            errors.push({ questionNumber: qNum, field: 'correctAnswers', message: `Missing or invalid correctAnswers array for multiple-choice` });
          } else {
            q.correctAnswers.forEach(ans => {
              if (!optionKeys.has(ans)) {
                errors.push({ questionNumber: qNum, field: 'correctAnswers', message: `Invalid correctAnswers entry "${ans}"` });
              }
            });
          }
        }
      }
    }

    if (moduleName === 'java-dsa' || moduleName === 'core-cs') {
       if (totalQuestions > 0 && (multipleChoiceCount !== 5 || mcqCount !== 20)) {
        errors.push({ questionNumber: 'Composition', field: 'types', message: `${moduleName} tests must contain exactly 5 multiple-choice and 20 mcq questions. Found ${multipleChoiceCount} multiple-choice, ${mcqCount} mcq.` });
      }
    } else if (moduleName === 'aptitude') {
       if (multipleChoiceCount > 0) {
        errors.push({ questionNumber: 'Composition', field: 'types', message: `Aptitude tests do not support "multiple-choice" type questions.` });
      }
    }
    if (errors.length > 0) {
       console.log('[VALIDATION] Question validation completed (Failed)');
       return { valid: false, errors };
    }
    console.log('[VALIDATION] Question validation completed');

    if (Model && testId && chapterSlug) {
      console.log('[VALIDATION] Database check started');

      // Check DB connection first
      if (mongoose.connection.readyState !== 1) {
        throw new Error('Database connection unavailable.');
      }

      // Parallelize independent DB checks
      const dbChecks = [];

      // 1. Test existence check (chapterSlug + testId check)
      dbChecks.push(PracticeTest.exists({ chapterSlug, testId }).maxTimeMS(5000));

      // 2. Duplicate question check in DB
      // Batch query using $in
      dbChecks.push(Model.find({ question: { $in: uploadedQuestionTexts } }, { question: 1 }).maxTimeMS(5000).lean());

      const [testExists, existingQuestions] = await Promise.all(dbChecks);

      if (testExists && !isReplace) {
        errors.push({ questionNumber: 'Metadata', field: 'testId', message: `Test ID already exists.` });
      }

      if (existingQuestions && existingQuestions.length > 0) {
        // Compare found questions with inMemoryKeys
        existingQuestions.forEach(eq => {
           const dbKey = normalizeQuestionKey(eq.question, moduleName, subject, chapterSlug, testId);
           if (inMemoryKeys.has(dbKey) && !isReplace) {
              errors.push({ questionNumber: 'Database', field: 'question', message: `Question already exists in database: "${eq.question.substring(0, 30)}..."` });
           }
        });
      }
      console.log('[VALIDATION] Database check completed');
    }
    
    if (errors.length > 0) {
      return { valid: false, errors };
    }

    const result = {
      valid: true,
      summary: {
        module: moduleName,
        subject: subject || moduleName,
        chapterSlug,
        testId,
        testNumber,
        chapterName,
        totalQuestions,
        multipleChoiceCount,
        mcqCount,
        totalMarks: totalQuestions 
      },
      questions: questions,
      Model 
    };
    
    console.log('[VALIDATION] Request completed');
    return result;
  }

  async importValidatedQuestions(jsonObj, isReplace = false) {
    const validationResult = await this.validateUpload(jsonObj, isReplace);
    
    if (!validationResult.valid) {
      const firstError = validationResult.errors[0];
      throw new Error(`Upload rejected: [Question ${firstError.questionNumber}] ${firstError.message}`);
    }

    const { Model, questions, summary } = validationResult;

    const docsToInsert = questions.map(q => ({
      ...q,
      chapterSlug: summary.chapterSlug,
      testId: summary.testId,
      ...(summary.module === 'aptitude' ? { section: summary.subject } : {})
    }));

    if (isReplace) {
      const deleteQuery = { chapterSlug: summary.chapterSlug, testId: summary.testId };
      if (summary.module === 'aptitude') {
        deleteQuery.section = summary.subject;
      }
      await Model.deleteMany(deleteQuery);
    }

    await Model.insertMany(docsToInsert);

    await TestStatusService.updateStatus({
      module: summary.module,
      subject: summary.module === 'core-cs' ? summary.subject : undefined,
      section: summary.module === 'aptitude' ? summary.subject : undefined,
      chapterSlug: summary.chapterSlug,
      testId: summary.testId,
      testName: jsonObj.testName,
      testNumber: summary.testNumber,
      chapterName: summary.chapterName
    });

    await ImportHistory.create({
      module: summary.module,
      subject: summary.module === 'core-cs' ? summary.subject : undefined,
      section: summary.module === 'aptitude' ? summary.subject : undefined,
      chapterSlug: summary.chapterSlug,
      testId: summary.testId,
      testName: jsonObj.testName,
      questionCount: questions.length,
      importedCount: questions.length,
      rejectedCount: 0,
      duplicateCount: 0,
      status: isReplace ? 'REPLACED' : 'SUCCESS'
    });

    return summary;
  }
}

module.exports = new QuestionImportService();
