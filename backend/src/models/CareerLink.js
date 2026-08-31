// ============================================================
// PREORBIT — CareerLink Model (v3)
// ============================================================
// v2: status, category
// v3: isGlobal, tentativeMonth, quarter
//     userId made optional (null for global entries)
//     url    made optional ('' for "coming soon" global entries)
// Backward compatible: existing docs get defaults automatically
// ============================================================

const mongoose = require('mongoose');

const CAREER_STATUSES = ['Saved', 'Interested', 'Applied', 'Archived'];

const CAREER_CATEGORIES = [
  'Full Time', 'Internship', 'Part Time', 'Remote', 'Freelance', 'Other',
];

const careerLinkSchema = new mongoose.Schema(
  {
    // null for global (curated) entries; required for user-created entries
    userId: {
      type:  mongoose.Schema.Types.ObjectId,
      ref:   'User',
      index: true,
      default: null,
    },

    companyName: {
      type:      String,
      required:  [true, 'Company name is required'],
      trim:      true,
      maxlength: [200, 'Company name cannot exceed 200 characters'],
    },

    jobTitle: {
      type:      String,
      required:  [true, 'Job title is required'],
      trim:      true,
      maxlength: [200, 'Job title cannot exceed 200 characters'],
    },

    // Optional for global "coming soon" entries (stored as '')
    url: {
      type:    String,
      trim:    true,
      default: '',
    },

    location: {
      type:      String,
      trim:      true,
      maxlength: [200, 'Location cannot exceed 200 characters'],
      default:   '',
    },

    notes: {
      type:      String,
      trim:      true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
      default:   '',
    },

    // Career status — distinct from PlacementApplication status
    status: {
      type:    String,
      enum:    {
        values:  CAREER_STATUSES,
        message: 'Invalid career status. Allowed: Saved, Interested, Applied, Archived.',
      },
      default: 'Saved',
    },

    // Optional category tag
    category: {
      type:    String,
      enum:    {
        values:  CAREER_CATEGORIES,
        message: 'Invalid category.',
      },
      default: 'Other',
    },

    // ── Global / Curated entry fields ─────────────────────────
    // true  → seeded curated opportunity, visible to all students (read-only)
    // false → user-created personal career link (default)
    isGlobal: {
      type:    Boolean,
      default: false,
      index:   true,
    },

    // e.g. "Aug–Sep", "Nov–Dec"  (from PDF timing column)
    tentativeMonth: {
      type:      String,
      trim:      true,
      maxlength: [50, 'Tentative month cannot exceed 50 characters'],
      default:   '',
    },

    // e.g. "Q1", "Q2", "Q3", "Q4"
    quarter: {
      type:      String,
      trim:      true,
      maxlength: [10, 'Quarter cannot exceed 10 characters'],
      default:   '',
    },

    // Chronological position for display ordering of global entries.
    // Lower = earlier in the calendar year. Personal entries default to 9999.
    sortOrder: {
      type:    Number,
      default: 9999,
      index:   true,
    },
  },
  {
    timestamps: true,
  }
);

careerLinkSchema.statics.CAREER_STATUSES   = CAREER_STATUSES;
careerLinkSchema.statics.CAREER_CATEGORIES = CAREER_CATEGORIES;

module.exports = mongoose.model('CareerLink', careerLinkSchema);
