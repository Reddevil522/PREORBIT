// ============================================================
// PREORBIT — PlacementApplication Model (v2)
// ============================================================
// Added: statusHistory[], followUpDate
// Backward compatible: existing docs without these fields
// still load correctly (statusHistory defaults to [], followUpDate to null)
// ============================================================

const mongoose = require('mongoose');

const VALID_STATUSES = [
  'Saved',
  'Applied',
  'Test',
  'Interview',
  'Technical Round',
  'HR Round',
  'Selected',
  'Rejected',
  'Withdrawn',
];

// Status history entry sub-document
const statusHistorySchema = new mongoose.Schema(
  {
    status:    { type: String, enum: VALID_STATUSES, required: true },
    changedAt: { type: Date,   required: true, default: Date.now   },
  },
  { _id: false }
);

const placementSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'userId is required'],
      index:    true,
    },

    // Optional reference to the CareerLink this application was created from.
    // Nullable: if the CareerLink is later deleted, this application must still exist.
    careerLinkId: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     'CareerLink',
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

    status: {
      type:    String,
      enum:    {
        values:  VALID_STATUSES,
        message: 'Invalid application status.',
      },
      default: 'Applied',
    },

    // Status change history — append-only; ordered chronologically
    statusHistory: {
      type:    [statusHistorySchema],
      default: [],
    },

    applicationUrl: {
      type:     String,
      trim:     true,
      default:  '',
      validate: {
        validator: (v) => !v || /^https?:\/\/.+/.test(v),
        message:  'Application URL must start with http:// or https://',
      },
    },

    applicationDate: {
      type:    Date,
      default: null,
    },

    // Optional follow-up reminder date
    followUpDate: {
      type:    Date,
      default: null,
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
  },
  {
    timestamps: true,
  }
);

placementSchema.statics.VALID_STATUSES = VALID_STATUSES;

module.exports = mongoose.model('PlacementApplication', placementSchema);
