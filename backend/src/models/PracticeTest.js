const mongoose = require('mongoose');

const practiceTestSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
    index: true
  },
  subject: {
    type: String, // Used for core-cs (e.g. 'oop')
  },
  section: {
    type: String, // Used for aptitude (e.g. 'quantitative')
  },
  chapterSlug: {
    type: String,
    required: true,
  },
  testId: {
    type: String,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  questionCount: {
    type: Number,
    default: 0,
  },
  multipleChoiceCount: {
    type: Number,
    default: 0,
  },
  mcqCount: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'incomplete', 'available', 'locked'],
    default: 'draft',
  },
  testNumber: {
    type: Number,
  },
  chapterName: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  configuration: {
    type: mongoose.Schema.Types.Mixed,
  }
}, {
  timestamps: true,
});

// Ensure uniqueness by chapterSlug and testId
practiceTestSchema.index({ chapterSlug: 1, testId: 1 }, { unique: true });

// Ensure unique testNumber per chapter (only for tests that actually have a testNumber)
practiceTestSchema.index(
  { chapterSlug: 1, testNumber: 1 }, 
  { unique: true, partialFilterExpression: { testNumber: { $type: "number" } } }
);

module.exports = mongoose.model('PracticeTest', practiceTestSchema);
