// ============================================================
// PREORBIT — Placement Controller (v2)
// ============================================================
// Added: statusHistory tracking, followUpDate, analytics endpoint
// ============================================================

const PlacementApplication = require('../models/PlacementApplication');
const { sendSuccess, sendError } = require('../utils/response');

const VALID_STATUSES = PlacementApplication.schema.path('status').enumValues;

const ACTIVE_STATUSES   = ['Saved', 'Applied', 'Test', 'Interview', 'Technical Round', 'HR Round'];
const TERMINAL_STATUSES = ['Selected', 'Rejected', 'Withdrawn'];
const INTERVIEW_STATUSES = ['Interview', 'Technical Round', 'HR Round'];
const IN_PROGRESS_STATUSES = ['Applied', 'Test', 'Interview', 'Technical Round', 'HR Round'];

// ── Helpers ─────────────────────────────────────────────────

const isValidUrl = (url) => !url || /^https?:\/\/.+/.test(url.trim());

const isValidDate = (d) => {
  const parsed = new Date(d);
  return !isNaN(parsed.getTime());
};

// ── GET /api/placement ──────────────────────────────────────
const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;

    const applications = await PlacementApplication
      .find({ userId })
      .sort({ applicationDate: -1, createdAt: -1 })
      .lean();

    return sendSuccess(res, 200, 'Placement applications fetched.', { applications });
  } catch (err) {
    console.error('[Placement] getApplications error:', err);
    return sendError(res, 500, 'Unable to load placement applications.');
  }
};

// ── GET /api/placement/summary ─────────────────────────────
const getPlacementSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [statusCounts, recentApplications] = await Promise.all([
      PlacementApplication.aggregate([
        { $match: { userId: userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      PlacementApplication.find({ userId })
        .sort({ applicationDate: -1, createdAt: -1 })
        .limit(3)
        .select('companyName jobTitle status applicationDate location createdAt')
        .lean(),
    ]);

    const counts = {};
    VALID_STATUSES.forEach(s => { counts[s] = 0; });
    statusCounts.forEach(({ _id, count }) => { counts[_id] = count; });

    const totalApplications = Object.values(counts).reduce((a, b) => a + b, 0);
    const inProgress = IN_PROGRESS_STATUSES.reduce((a, s) => a + (counts[s] || 0), 0);

    return sendSuccess(res, 200, 'Placement summary fetched.', {
      totalApplications,
      inProgress,
      saved:          counts['Saved'],
      applied:        counts['Applied'],
      test:           counts['Test'],
      interview:      counts['Interview'],
      technicalRound: counts['Technical Round'],
      hrRound:        counts['HR Round'],
      selected:       counts['Selected'],
      rejected:       counts['Rejected'],
      withdrawn:      counts['Withdrawn'],
      recentApplications,
    });
  } catch (err) {
    console.error('[Placement] getPlacementSummary error:', err);
    return sendError(res, 500, 'Unable to load placement summary.');
  }
};

// ── GET /api/placement/analytics ───────────────────────────
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now    = new Date();

    const [statusCounts, followUpsDueCount] = await Promise.all([
      PlacementApplication.aggregate([
        { $match: { userId: userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      // Follow-ups overdue: followUpDate <= now AND status is active
      PlacementApplication.countDocuments({
        userId,
        followUpDate: { $ne: null, $lte: now },
        status:       { $in: ACTIVE_STATUSES },
      }),
    ]);

    const counts = {};
    VALID_STATUSES.forEach(s => { counts[s] = 0; });
    statusCounts.forEach(({ _id, count }) => { counts[_id] = count; });

    const total     = Object.values(counts).reduce((a, b) => a + b, 0);
    const active    = ACTIVE_STATUSES.reduce((a, s)   => a + (counts[s] || 0), 0);
    const selected  = counts['Selected']  || 0;
    const rejected  = counts['Rejected']  || 0;
    const withdrawn = counts['Withdrawn'] || 0;
    const test      = counts['Test']      || 0;
    const interview = INTERVIEW_STATUSES.reduce((a, s) => a + (counts[s] || 0), 0);

    const completed  = selected + rejected;
    const successRate = completed > 0
      ? Math.round((selected / completed) * 100)
      : null; // null = N/A

    return sendSuccess(res, 200, 'Placement analytics fetched.', {
      total,
      active,
      selected,
      rejected,
      withdrawn,
      test,
      interview,
      followUpsDue: followUpsDueCount,
      successRate,  // null means N/A (zero completed), number means percentage
    });
  } catch (err) {
    console.error('[Placement] getAnalytics error:', err);
    return sendError(res, 500, 'Unable to load placement analytics.');
  }
};

// ── POST /api/placement ─────────────────────────────────────
const createApplication = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      companyName,
      jobTitle,
      status         = 'Applied',
      applicationUrl = '',
      applicationDate,
      followUpDate,
      location       = '',
      notes          = '',
    } = req.body;

    // Required
    if (!companyName || !String(companyName).trim()) {
      return sendError(res, 400, 'Company name is required.');
    }
    if (!jobTitle || !String(jobTitle).trim()) {
      return sendError(res, 400, 'Job title is required.');
    }
    if (!VALID_STATUSES.includes(status)) {
      return sendError(res, 400, `Invalid status. Allowed: ${VALID_STATUSES.join(', ')}`);
    }
    if (applicationUrl && !isValidUrl(applicationUrl)) {
      return sendError(res, 400, 'Application URL must start with http:// or https://');
    }

    let parsedAppDate = null;
    if (applicationDate) {
      if (!isValidDate(applicationDate)) return sendError(res, 400, 'Application date is invalid.');
      parsedAppDate = new Date(applicationDate);
    }

    let parsedFollowUp = null;
    if (followUpDate) {
      if (!isValidDate(followUpDate)) return sendError(res, 400, 'Follow-up date is invalid.');
      parsedFollowUp = new Date(followUpDate);
    }

    const now = new Date();

    const app = await PlacementApplication.create({
      userId,
      companyName:     String(companyName).trim(),
      jobTitle:        String(jobTitle).trim(),
      status,
      statusHistory:   [{ status, changedAt: parsedAppDate || now }],
      applicationUrl:  String(applicationUrl).trim(),
      applicationDate: parsedAppDate,
      followUpDate:    parsedFollowUp,
      location:        String(location).trim(),
      notes:           String(notes).trim(),
    });

    return sendSuccess(res, 201, 'Placement application created.', { application: app });
  } catch (err) {
    console.error('[Placement] createApplication error:', err);
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join('; ');
      return sendError(res, 400, msg);
    }
    return sendError(res, 500, 'Failed to create placement application.');
  }
};

// ── PUT /api/placement/:id ──────────────────────────────────
const updateApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id }  = req.params;

    const existing = await PlacementApplication.findOne({ _id: id, userId });
    if (!existing) {
      return sendError(res, 404, 'Placement application not found.');
    }

    const {
      companyName,
      jobTitle,
      status,
      applicationUrl,
      applicationDate,
      followUpDate,
      location,
      notes,
    } = req.body;

    // Validations
    if (companyName !== undefined && !String(companyName).trim()) {
      return sendError(res, 400, 'Company name cannot be empty.');
    }
    if (jobTitle !== undefined && !String(jobTitle).trim()) {
      return sendError(res, 400, 'Job title cannot be empty.');
    }
    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return sendError(res, 400, `Invalid status. Allowed: ${VALID_STATUSES.join(', ')}`);
    }
    if (applicationUrl !== undefined && applicationUrl && !isValidUrl(applicationUrl)) {
      return sendError(res, 400, 'Application URL must start with http:// or https://');
    }
    if (applicationDate !== undefined && applicationDate && !isValidDate(applicationDate)) {
      return sendError(res, 400, 'Application date is invalid.');
    }
    if (followUpDate !== undefined && followUpDate && !isValidDate(followUpDate)) {
      return sendError(res, 400, 'Follow-up date is invalid.');
    }

    // Apply field updates
    if (companyName    !== undefined) existing.companyName    = String(companyName).trim();
    if (jobTitle       !== undefined) existing.jobTitle       = String(jobTitle).trim();
    if (applicationUrl !== undefined) existing.applicationUrl = String(applicationUrl).trim();
    if (location       !== undefined) existing.location       = String(location).trim();
    if (notes          !== undefined) existing.notes          = String(notes).trim();

    if (applicationDate !== undefined) {
      existing.applicationDate = applicationDate ? new Date(applicationDate) : null;
    }

    if (followUpDate !== undefined) {
      existing.followUpDate = followUpDate ? new Date(followUpDate) : null;
    }

    // Status change — append to history only if actually different from last entry
    if (status !== undefined && status !== existing.status) {
      existing.status = status;

      // Get last history entry
      const history = existing.statusHistory || [];
      const lastEntry = history.length > 0 ? history[history.length - 1] : null;

      // Only append if the new status differs from the last recorded status
      if (!lastEntry || lastEntry.status !== status) {
        existing.statusHistory.push({ status, changedAt: new Date() });
      }
    }

    const updated = await existing.save();
    return sendSuccess(res, 200, 'Placement application updated.', { application: updated });
  } catch (err) {
    console.error('[Placement] updateApplication error:', err);
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join('; ');
      return sendError(res, 400, msg);
    }
    return sendError(res, 500, 'Failed to update placement application.');
  }
};

// ── DELETE /api/placement/:id ───────────────────────────────
const deleteApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id }  = req.params;

    const deleted = await PlacementApplication.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return sendError(res, 404, 'Placement application not found.');
    }

    return sendSuccess(res, 200, 'Placement application deleted.');
  } catch (err) {
    console.error('[Placement] deleteApplication error:', err);
    return sendError(res, 500, 'Failed to delete placement application.');
  }
};

module.exports = {
  getApplications,
  getPlacementSummary,
  getAnalytics,
  createApplication,
  updateApplication,
  deleteApplication,
};
