const express = require('express');
const router = express.Router();
const importController = require('../../controllers/admin/importController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── ADMIN JSON IMPORT ──
// POST /api/admin/import/preview
// Express json parser limits body size securely (configured in server.js or here)
router.post('/preview', authMiddleware, requireRole('admin'), importController.previewImport);

// POST /api/admin/import/execute
// Full re-validation and database insertion
router.post('/execute', authMiddleware, requireRole('admin'), importController.executeImport);

// GET /api/admin/import/history
// Fetch paginated import history
router.get('/history', authMiddleware, requireRole('admin'), importController.getImportHistory);

module.exports = router;
