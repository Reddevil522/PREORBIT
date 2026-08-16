// ============================================================
// PREORBIT — CareerLink Model (v2)
// ============================================================
// Added: status (Saved/Interested/Applied/Archived), category
// Backward compatible: existing docs get defaults automatically
// ============================================================

const mongoose = require('mongoose');

const CAREER_STATUSES = ['Saved', 'Interested', 'Applied', 'Archived'];

const CAREER_CATEGORIES = [
  'Full Time', 'Internship', 'Part Time', 'Remote', 'Freelance', 'Other',
];

const careerLinkSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'userId is required'],
      index:    true,
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

    url: {
      type:     String,
      required: [true, 'URL is required'],
      trim:     true,
      validate: {
        validator: (v) => /^https?:\/\/.+/.test(v),
        message:  'URL must start with http:// or https://',
      },
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
  },
  {
    timestamps: true,
  }
);

careerLinkSchema.statics.CAREER_STATUSES   = CAREER_STATUSES;
careerLinkSchema.statics.CAREER_CATEGORIES = CAREER_CATEGORIES;

module.exports = mongoose.model('CareerLink', careerLinkSchema);
