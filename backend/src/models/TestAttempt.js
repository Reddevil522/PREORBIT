const mongoose = require('mongoose');
const crypto = require('crypto');

const TestAttemptSchema = new mongoose.Schema({
  attemptId: {
    type: String,
    required: true,
    unique: true,
    default: () => `attempt_${crypto.randomUUID()}`
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['in-progress', 'submitted'],
    default: 'in-progress',
    required: true
  },
  questionIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  startedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  submittedAt: {
    type: Date,
    default: null
  },
  evaluation: {
    totalQuestions: { type: Number, default: 0 },
    attempted: { type: Number, default: 0 },
    correct: { type: Number, default: 0 },
    incorrect: { type: Number, default: 0 },
    unattempted: { type: Number, default: 0 },
    obtainedMarks: { type: Number, default: 0 },
    maximumMarks: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Compound index for quickly finding a user's active attempt for a specific test
TestAttemptSchema.index({ userId: 1, testId: 1, status: 1 });

module.exports = mongoose.model('TestAttempt', TestAttemptSchema);
