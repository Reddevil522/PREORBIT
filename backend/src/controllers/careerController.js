// ============================================================
// PREORBIT — Career Controller (v2)
// ============================================================
// Added: status, category, archive, restore, career summary
//        aggregation, Track Application → Placement conversion
// ============================================================

const CareerLink          = require('../models/CareerLink');
const PlacementApplication = require('../models/PlacementApplication');
const { sendSuccess, sendError } = require('../utils/response');

const CAREER_STATUSES   = CareerLink.schema.path('status').enumValues;
const CAREER_CATEGORIES = CareerLink.schema.path('category').enumValues;
const VALID_PL_STATUSES = PlacementApplication.schema.path('status').enumValues;

// ── Helpers ──────────────────────────────────────────────────
const isValidUrl = (url) => /^https?:\/\/.+/.test(url.trim());

// ── GET /api/career ──────────────────────────────────────────
const getCareerLinks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const links = await CareerLink.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return sendSuccess(res, 200, 'Career links fetched successfully.', { links });
  } catch (err) {
    console.error('[Career] getCareerLinks error:', err);
    return sendError(res, 500, 'Unable to load career links.');
  }
};

// ── GET /api/career/summary ──────────────────────────────────
// Aggregated counts by status + category + 3 recent (for dashboard)
const getCareerSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    const [statusAgg, categoryAgg, recentLinks] = await Promise.all([
      CareerLink.aggregate([
        { $match: { userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      CareerLink.aggregate([
        { $match: { userId, status: { $ne: 'Archived' } } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
      CareerLink.find({ userId })
        .sort({ createdAt: -1 })
        .limit(3)
        .select('companyName jobTitle url status category createdAt')
        .lean(),
    ]);

    // Build status counts (zero-fill)
    const statusCounts = {};
    CAREER_STATUSES.forEach(s => { statusCounts[s] = 0; });
    statusAgg.forEach(({ _id, count }) => { statusCounts[_id] = count; });

    const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

    // Build category counts map
    const categoryCounts = {};
    categoryAgg.forEach(({ _id, count }) => { categoryCounts[_id || 'Other'] = count; });

    // Dashboard-compatible: keep savedLinks as total non-archived
    const savedLinks = total - (statusCounts['Archived'] || 0);

    return sendSuccess(res, 200, 'Career summary fetched.', {
      savedLinks,       // backward compat (dashboard uses this)
      total,
      saved:       statusCounts['Saved'],
      interested:  statusCounts['Interested'],
      applied:     statusCounts['Applied'],
      archived:    statusCounts['Archived'],
      categoryCounts,
      recentLinks,
    });
  } catch (err) {
    console.error('[Career] getCareerSummary error:', err);
    return sendError(res, 500, 'Unable to load career summary.');
  }
};

// ── POST /api/career ─────────────────────────────────────────
const createCareerLink = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      companyName,
      jobTitle,
      url,
      location  = '',
      notes     = '',
      status    = 'Saved',
      category  = 'Other',
    } = req.body;

    if (!companyName || !String(companyName).trim()) {
      return sendError(res, 400, 'Company name is required.');
    }
    if (String(companyName).trim().length > 150) {
      return sendError(res, 400, 'Company name is too long.');
    }
    if (!jobTitle || !String(jobTitle).trim()) {
      return sendError(res, 400, 'Job title is required.');
    }
    if (String(jobTitle).trim().length > 150) {
      return sendError(res, 400, 'Job title is too long.');
    }
    if (!url || !String(url).trim()) {
      return sendError(res, 400, 'URL is required.');
    }
    if (!isValidUrl(url)) {
      return sendError(res, 400, 'URL must start with http:// or https://');
    }
    if (String(url).trim().length > 500) {
      return sendError(res, 400, 'URL is too long.');
    }
    if (location && String(location).trim().length > 150) {
      return sendError(res, 400, 'Location is too long.');
    }
    if (notes && String(notes).trim().length > 1000) {
      return sendError(res, 400, 'Notes are too long (max 1000 characters).');
    }
    if (!CAREER_STATUSES.includes(status)) {
      return sendError(res, 400, `Invalid career status. Allowed: ${CAREER_STATUSES.join(', ')}`);
    }
    if (!CAREER_CATEGORIES.includes(category)) {
      return sendError(res, 400, `Invalid category. Allowed: ${CAREER_CATEGORIES.join(', ')}`);
    }

    const link = await CareerLink.create({
      userId,
      companyName: String(companyName).trim(),
      jobTitle:    String(jobTitle).trim(),
      url:         String(url).trim(),
      location:    String(location).trim(),
      notes:       String(notes).trim(),
      status,
      category,
    });

    return sendSuccess(res, 201, 'Career link saved.', { link });
  } catch (err) {
    console.error('[Career] createCareerLink error:', err);
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join('; ');
      return sendError(res, 400, msg);
    }
    return sendError(res, 500, 'Failed to save career link.');
  }
};

// ── PUT /api/career/:id ──────────────────────────────────────
const updateCareerLink = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const existing = await CareerLink.findOne({ _id: id, userId });
    if (!existing) return sendError(res, 404, 'Career link not found.');

    const { companyName, jobTitle, url, location, notes, status, category } = req.body;

    if (companyName !== undefined && !String(companyName).trim()) {
      return sendError(res, 400, 'Company name cannot be empty.');
    }
    if (companyName !== undefined && String(companyName).trim().length > 150) {
      return sendError(res, 400, 'Company name is too long.');
    }
    if (jobTitle !== undefined && !String(jobTitle).trim()) {
      return sendError(res, 400, 'Job title cannot be empty.');
    }
    if (jobTitle !== undefined && String(jobTitle).trim().length > 150) {
      return sendError(res, 400, 'Job title is too long.');
    }
    if (url !== undefined) {
      if (!String(url).trim()) return sendError(res, 400, 'URL cannot be empty.');
      if (!isValidUrl(url))    return sendError(res, 400, 'URL must start with http:// or https://');
      if (String(url).trim().length > 500) return sendError(res, 400, 'URL is too long.');
    }
    if (location !== undefined && String(location).trim().length > 150) {
      return sendError(res, 400, 'Location is too long.');
    }
    if (notes !== undefined && String(notes).trim().length > 1000) {
      return sendError(res, 400, 'Notes are too long (max 1000 characters).');
    }
    if (status !== undefined && !CAREER_STATUSES.includes(status)) {
      return sendError(res, 400, `Invalid career status. Allowed: ${CAREER_STATUSES.join(', ')}`);
    }
    if (category !== undefined && !CAREER_CATEGORIES.includes(category)) {
      return sendError(res, 400, `Invalid category. Allowed: ${CAREER_CATEGORIES.join(', ')}`);
    }

    if (companyName !== undefined) existing.companyName = String(companyName).trim();
    if (jobTitle    !== undefined) existing.jobTitle    = String(jobTitle).trim();
    if (url         !== undefined) existing.url         = String(url).trim();
    if (location    !== undefined) existing.location    = String(location).trim();
    if (notes       !== undefined) existing.notes       = String(notes).trim();
    if (status      !== undefined) existing.status      = status;
    if (category    !== undefined) existing.category    = category;

    const updated = await existing.save();
    return sendSuccess(res, 200, 'Career link updated.', { link: updated });
  } catch (err) {
    console.error('[Career] updateCareerLink error:', err);
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join('; ');
      return sendError(res, 400, msg);
    }
    return sendError(res, 500, 'Failed to update career link.');
  }
};

// ── DELETE /api/career/:id ───────────────────────────────────
// IMPORTANT: only removes CareerLink — PlacementApplications linked to it remain.
const deleteCareerLink = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const deleted = await CareerLink.findOneAndDelete({ _id: id, userId });
    if (!deleted) return sendError(res, 404, 'Career link not found.');

    // DO NOT delete linked PlacementApplications — they represent real applications.
    // careerLinkId in PlacementApplication stays as-is; queries should handle null refs.

    return sendSuccess(res, 200, 'Career link deleted.');
  } catch (err) {
    console.error('[Career] deleteCareerLink error:', err);
    return sendError(res, 500, 'Failed to delete career link.');
  }
};

// ── POST /api/career/:id/track ───────────────────────────────
// Convert a CareerLink into a PlacementApplication.
// 1. Check if one already exists from this careerLinkId.
// 2. Create PlacementApplication with pre-filled data.
// 3. Update CareerLink status to "Applied" ONLY on success.
const trackApplication = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Verify ownership of career link
    const careerLink = await CareerLink.findOne({ _id: id, userId });
    if (!careerLink) return sendError(res, 404, 'Career link not found.');

    // Check if already tracked (same careerLinkId + userId)
    const existing = await PlacementApplication.findOne({ userId, careerLinkId: id });
    if (existing) {
      return sendSuccess(res, 200, 'Application already tracked.', {
        alreadyTracked:  true,
        applicationId:   String(existing._id),
        applicationStatus: existing.status,
      });
    }

    // Extract create payload from request (student may have edited in the form)
    const {
      companyName    = careerLink.companyName,
      jobTitle       = careerLink.jobTitle,
      applicationUrl = careerLink.url,
      location       = careerLink.location,
      notes          = '',
      status         = 'Applied',
      applicationDate,
      followUpDate,
    } = req.body;

    if (!VALID_PL_STATUSES.includes(status)) {
      return sendError(res, 400, `Invalid placement status.`);
    }

    const now = new Date();

    // Create placement application
    const application = await PlacementApplication.create({
      userId,
      careerLinkId:    id,           // reference (nullable; safe if CareerLink deleted)
      companyName:     String(companyName).trim(),
      jobTitle:        String(jobTitle).trim(),
      status,
      statusHistory:   [{ status, changedAt: applicationDate ? new Date(applicationDate) : now }],
      applicationUrl:  String(applicationUrl || '').trim(),
      applicationDate: applicationDate ? new Date(applicationDate) : null,
      followUpDate:    followUpDate   ? new Date(followUpDate)    : null,
      location:        String(location || '').trim(),
      notes:           String(notes   || '').trim(),
    });

    // Only update CareerLink status AFTER successful application creation
    careerLink.status = 'Applied';
    await careerLink.save();

    return sendSuccess(res, 201, 'Application tracked and career link updated.', {
      alreadyTracked: false,
      application,
      link: careerLink,
    });
  } catch (err) {
    console.error('[Career] trackApplication error:', err);
    if (err.name === 'ValidationError') {
      const msg = Object.values(err.errors).map(e => e.message).join('; ');
      return sendError(res, 400, msg);
    }
    return sendError(res, 500, 'Failed to track application.');
  }
};

module.exports = {
  getCareerLinks,
  getCareerSummary,
  createCareerLink,
  updateCareerLink,
  deleteCareerLink,
  trackApplication,
};
