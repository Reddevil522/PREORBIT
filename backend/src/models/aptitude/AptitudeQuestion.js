const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const quantitativeChapters = [
  'percentage',
  'profit-loss',
  'ratio-proportion',
  'average',
  'time-work',
  'time-speed-distance',
  'simple-interest',
  'compound-interest',
  'probability'
];

const logicalReasoningChapters = [
  'coding-decoding',
  'blood-relations',
  'direction-sense',
  'syllogism',
  'analogy',
  'classification',
  'series',
  'seating-arrangement'
];

const AptitudeQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [OptionSchema],
    required: [true, 'Options are required'],
    validate: [
      {
        validator: v => v && v.length > 0,
        message: 'At least one option is required'
      },
      {
        validator: v => {
          if (!v) return true;
          const keys = v.map(opt => opt.key);
          return new Set(keys).size === keys.length;
        },
        message: 'Option keys must be unique'
      },
      {
        validator: v => {
          if (!v) return true;
          return v.every(opt => opt.text && opt.text.trim().length > 0);
        },
        message: 'Option values cannot be empty'
      }
    ]
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    validate: {
      validator: function(v) {
        if (!v) return false;
        return this.options && this.options.some(opt => opt.key === v);
      },
      message: 'Correct answer must match an option key'
    }
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: ['quantitative', 'logical-reasoning']
  },
  chapterSlug: {
    type: String,
    required: [true, 'Chapter slug is required'],
    validate: {
      validator: function(v) {
        if (this.section === 'quantitative') {
          return quantitativeChapters.includes(v);
        } else if (this.section === 'logical-reasoning') {
          return logicalReasoningChapters.includes(v);
        }
        return false;
      },
      message: 'Chapter slug does not match the chosen section'
    }
  },
  testId: {
    type: String,
    required: [true, 'Test ID is required']
  },
  marks: {
    type: Number,
    default: 1,
    required: [true, 'Marks are required'],
    enum: [1]
  },
  explanation: {
    type: String,
    default: ''
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard']
  },
  tags: {
    type: [String],
    default: []
  },
  source: {
    type: String
  }
}, { timestamps: true });

// Primary query index
AptitudeQuestionSchema.index({ section: 1, chapterSlug: 1, testId: 1 });
AptitudeQuestionSchema.index({ testId: 1 });

module.exports = mongoose.models.AptitudeQuestion || mongoose.model('AptitudeQuestion', AptitudeQuestionSchema);
