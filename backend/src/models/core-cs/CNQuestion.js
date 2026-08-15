const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

const cnChapters = [
  'introduction-to-networks',
  'osi-model',
  'tcp-ip-model',
  'network-devices',
  'ip-addressing',
  'subnetting',
  'tcp',
  'udp',
  'routing',
  'http-https',
  'dns'
];

const CNQuestionSchema = new mongoose.Schema({
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
  questionType: {
    type: String,
    enum: ['mcq', 'multiple-choice'],
    required: [true, 'Question type is required']
  },
  correctAnswer: {
    type: String,
    required: function() { return this.questionType === 'mcq'; },
    validate: {
      validator: function(v) {
        if (this.questionType !== 'mcq') return true;
        if (!v) return false;
        return this.options && this.options.some(opt => opt.key === v);
      },
      message: 'Correct answer must match an option key'
    }
  },
  correctAnswers: {
    type: [String],
    required: function() { return this.questionType === 'multiple-choice'; },
    validate: {
      validator: function(v) {
        if (this.questionType !== 'multiple-choice') return true;
        if (!v || v.length === 0) return false;
        const optionKeys = this.options ? this.options.map(opt => opt.key) : [];
        return v.every(ans => optionKeys.includes(ans));
      },
      message: 'All correct answers must match option keys'
    }
  },
  chapterSlug: {
    type: String,
    required: [true, 'Chapter slug is required'],
    enum: {
      values: cnChapters,
      message: 'Chapter slug is not valid for CN'
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

CNQuestionSchema.index({ chapterSlug: 1 });
CNQuestionSchema.index({ testId: 1 });
CNQuestionSchema.index({ chapterSlug: 1, testId: 1 });

module.exports = mongoose.models.CNQuestion || mongoose.model('CNQuestion', CNQuestionSchema);
