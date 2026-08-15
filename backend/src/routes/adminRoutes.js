// ============================================================
// PREORBIT — Admin Routes
// ============================================================
// All routes under /api/admin are protected by:
//   1. authMiddleware  — requires a valid JWT
//   2. requireRole('admin') — requires role === 'admin'
//
// Feature routes (question upload, user management, analytics)
// will be added in later prompts.
// ============================================================

const express        = require('express');
const router         = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { sendSuccess } = require('../utils/response');

// Apply both guards to every route in this router
router.use(authMiddleware);
router.use(requireRole('admin'));

// ── Admin health / status ─────────────────────────────────────
// GET /api/admin/status
// Verifies admin access is functioning correctly.
router.get('/status', (req, res) => {
  sendSuccess(res, 200, 'Admin access confirmed', {
    admin:  req.user.email,
    role:   req.user.role,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
