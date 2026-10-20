// ============================================================
// PREORBIT — CDS English Question Model
// ============================================================
// Mongoose schema for all CDS English test questions:
//   - Grammar (20 MCQs per test)
//   - Vocabulary (20 MCQs per test; Synonyms & Antonyms has 10+10 split)
//   - Reading Comprehension (10 MCQs per test; 2 passages x 5 questions)
// Every question is an MCQ with exactly 4 options: A, B, C, D.
// ============================================================

const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  key: { 
    type: String, 
    required: [true, 'Option key is required'], 
    enum: ['A', 'B', 'C', 'D'] 
  },
  text: { 
    type: String, 
    required: [true, 'Option text is required'],
    trim: true,
    validate: {
      validator: v => typeof v === 'string' && v.trim().length > 0,
      message: 'Option text cannot be empty'
    }
  }
}, { _id: false });

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

const CDSEnglishQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    minlength: [5, 'Question text must be at least 5 characters']
  },

  options: {
    type: [OptionSchema],
    required: [true, 'Options are required'],
    validate: [
      {
        validator: v => Array.isArray(v) && v.length === 4,
        message: 'Exactly four options (A, B, C, D) are required'
      },
      {
        validator: v => {
          if (!v) return false;
          const keys = v.map(opt => opt.key);
          const uniqueKeys = new Set(keys);
          return uniqueKeys.size === 4 && ['A', 'B', 'C', 'D'].every(k => uniqueKeys.has(k));
        },
        message: 'Option keys must uniquely be A, B, C, and D'
      },
      {
        validator: v => {
          if (!v) return false;
          return v.every(opt => opt.text && opt.text.trim().length > 0);
        },
        message: 'Option texts cannot be empty'
      }
    ]
  },

  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    enum: ['A', 'B', 'C', 'D'],
    validate: {
      validator: function(v) {
        if (!v) return false;
        return this.options && this.options.some(opt => opt.key === v);
      },
      message: 'Correct answer must match an existing option key (A, B, C, or D)'
    }
  },

  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: ['grammar', 'vocabulary', 'reading-comprehension']
  },

  chapterSlug: {
    type: String,
    required: [true, 'Chapter slug is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        if (this.section === 'grammar') {
          return grammarChapters.includes(v);
        } else if (this.section === 'vocabulary') {
          return vocabularyChapters.includes(v);
        } else if (this.section === 'reading-comprehension') {
          return rcChapters.includes(v);
        }
        return false;
      },
      message: 'Chapter slug does not match the chosen CDS English section'
    }
  },

  testId: {
    type: String,
    required: [true, 'Test ID is required'],
    trim: true,
    index: true
  },

  questionType: {
    type: String,
    enum: ['mcq'],
    default: 'mcq',
    required: true
  },

  marks: {
    type: Number,
    default: 1,
    enum: [1],
    required: true
  },

  explanation: {
    type: String,
    required: [true, 'Explanation is required'],
    trim: true,
    minlength: [5, 'Explanation must be at least 5 characters']
  },

  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },

  // Vocabulary-Specific: Explicitly 'synonym' or 'antonym' for the combined chapter
  subTopic: {
    type: String,
    enum: ['synonym', 'antonym', 'standard', null],
    default: null,
    validate: {
      validator: function(v) {
        if (this.chapterSlug === 'synonyms-antonyms') {
          return v === 'synonym' || v === 'antonym';
        }
        return true;
      },
      message: 'Questions in the Synonyms & Antonyms chapter must have subTopic explicitly set to "synonym" or "antonym"'
    }
  },

  // Reading Comprehension Specific: Passage association
  passageNumber: {
    type: Number,
    enum: [1, 2, null],
    default: null,
    validate: {
      validator: function(v) {
        if (this.section === 'reading-comprehension') {
          return v === 1 || v === 2;
        }
        return true;
      },
      message: 'Reading Comprehension questions must be associated with passageNumber 1 or 2'
    }
  },

  passageText: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        if (this.section === 'reading-comprehension') {
          return typeof v === 'string' && v.trim().length > 20;
        }
        return true;
      },
      message: 'Reading Comprehension questions must have non-empty passageText'
    }
  },

  passageTitle: {
    type: String,
    default: null
  }
}, { timestamps: true });

// Primary performance query indexes
CDSEnglishQuestionSchema.index({ section: 1, chapterSlug: 1, testId: 1 });
CDSEnglishQuestionSchema.index({ testId: 1, passageNumber: 1 });
CDSEnglishQuestionSchema.index({ testId: 1, subTopic: 1 });

module.exports = mongoose.models.CDSEnglishQuestion || mongoose.model('CDSEnglishQuestion', CDSEnglishQuestionSchema);
