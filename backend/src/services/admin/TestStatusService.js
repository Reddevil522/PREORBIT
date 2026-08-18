const PracticeTest = require('../../models/PracticeTest');
const JavaDSAQuestion = require('../../models/java-dsa/JavaDSAQuestion');
const AptitudeQuestion = require('../../models/aptitude/AptitudeQuestion');
const OOPQuestion = require('../../models/core-cs/OOPQuestion');
const DBMSQuestion = require('../../models/core-cs/DBMSQuestion');
const OSQuestion = require('../../models/core-cs/OSQuestion');
const CNQuestion = require('../../models/core-cs/CNQuestion');
const SQLQuestion = require('../../models/core-cs/SQLQuestion');

class TestStatusService {
  
  // Helper to get correct model based on metadata
  getModel(module, subject) {
    if (module === 'java-dsa') return JavaDSAQuestion;
    if (module === 'aptitude') return AptitudeQuestion;
    if (module === 'core-cs') {
      const coreCsModels = {
        'oop': OOPQuestion,
        'dbms': DBMSQuestion,
        'operating-system': OSQuestion,
        'computer-networks': CNQuestion,
        'sql': SQLQuestion
      };
      return coreCsModels[subject];
    }
    return null;
  }

  // Helper to check test requirements
  validateRequirements(module, totalQuestions, multipleChoiceCount, mcqCount, totalMarks) {
    if (module === 'java-dsa' || module === 'core-cs') {
      if (totalQuestions === 25 && multipleChoiceCount === 5 && mcqCount === 20 && totalMarks === 25) {
        return { status: 'available', reason: null };
      }
      return { 
        status: 'incomplete', 
        reason: `Missing requirements: Expected 25 questions (5 multiple-choice, 20 mcq, 25 marks). Found ${totalQuestions} questions (${multipleChoiceCount} multiple-choice, ${mcqCount} mcq, ${totalMarks} marks).` 
      };
    } else if (module === 'aptitude') {
      if (totalQuestions === 15 && totalMarks === 15) {
        return { status: 'available', reason: null };
      }
      return { 
        status: 'incomplete', 
        reason: `Missing requirements: Expected 15 questions (15 marks). Found ${totalQuestions} questions (${totalMarks} marks).` 
      };
    }
    return { status: 'incomplete', reason: 'Invalid module requirements' };
  }

  async updateStatus(metadata) {
    const { module, subject, section, chapterSlug, testId, testName, testNumber, chapterName } = metadata;
    
    // 1. Resolve Model
    const Model = this.getModel(module, subject || section); // Use section as subject for aptitude if passed as such
    
    if (!Model) {
      throw new Error(`Invalid module or subject for TestStatusService: ${module} / ${subject}`);
    }

    // 2. Build Query
    const query = { chapterSlug, testId };
    if (module === 'aptitude') {
      query.section = subject || section; // In aptitude, section defines the subject
    }

    // 3. Fetch Questions to Calculate Real Stats
    const questions = await Model.find(query);
    
    let totalQuestions = questions.length;
    let multipleChoiceCount = 0;
    let mcqCount = 0;
    let totalMarks = 0;

    questions.forEach(q => {
      totalMarks += (q.marks || 1); // Assuming 1 mark per question by default
      if (q.questionType === 'multiple-choice') {
        multipleChoiceCount++;
      } else {
        mcqCount++;
      }
    });

    // 4. Validate Requirements
    const { status } = this.validateRequirements(module, totalQuestions, multipleChoiceCount, mcqCount, totalMarks);

    // 5. Upsert PracticeTest document
    // We do NOT upsert isAvailable. It defaults to false on insert, and preserves its existing value on update.
    const testDoc = await PracticeTest.findOneAndUpdate(
      { chapterSlug, testId }, // Use chapterSlug and testId as the unique identifier
      {
        module,
        subject: subject || null,
        section: section || null,
        chapterSlug,
        testId,
        testName: testName || `${chapterSlug} - ${testId}`, // generate if absent
        ...(testNumber !== undefined && { testNumber }),
        ...(chapterName !== undefined && { chapterName }),
        questionCount: totalQuestions,
        multipleChoiceCount,
        mcqCount,
        totalMarks,
        status,
        ...(status === 'available' ? { isAvailable: true } : (status === 'incomplete' || status === 'draft' ? { isAvailable: false } : {})),
        configuration: {
          totalQuestions,
          totalMarks,
          questionTypes: {
            multipleChoice: multipleChoiceCount,
            mcq: mcqCount
          },
          marksPerQuestion: 1
        }
      },
      { new: true, upsert: true }
    );

    return testDoc;
  }
}

module.exports = new TestStatusService();
