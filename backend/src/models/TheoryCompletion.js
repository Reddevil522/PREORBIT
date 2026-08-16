const mongoose = require('mongoose');

const theoryCompletionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chapterSlug: {
    type: String,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

// Ensure a user can only complete a chapter once
theoryCompletionSchema.index({ userId: 1, chapterSlug: 1 }, { unique: true });

module.exports = mongoose.model('TheoryCompletion', theoryCompletionSchema);
