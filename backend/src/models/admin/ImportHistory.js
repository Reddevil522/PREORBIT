const mongoose = require('mongoose');

const importHistorySchema = new mongoose.Schema({
  module: { type: String, required: true },
  subject: { type: String },
  section: { type: String },
  chapterSlug: { type: String, required: true },
  testId: { type: String, required: true },
  testName: { type: String },
  questionCount: { type: Number, default: 0 },
  importedCount: { type: Number, default: 0 },
  rejectedCount: { type: Number, default: 0 },
  duplicateCount: { type: Number, default: 0 },
  status: { type: String, enum: ['SUCCESS', 'FAILED', 'REPLACED'], required: true },
}, {
  timestamps: true 
});

module.exports = mongoose.model('ImportHistory', importHistorySchema);
