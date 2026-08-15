const express = require('express');
const router = express.Router();
const adminTestController = require('../../controllers/admin/adminTestController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── ADMIN TEST MANAGEMENT ──
// GET /api/admin/tests
router.get('/', authMiddleware, requireRole('admin'), adminTestController.getTests);

// GET /api/admin/tests/:id
router.get('/:id', authMiddleware, requireRole('admin'), adminTestController.getTestById);

// DELETE /api/admin/tests/:id
router.delete('/:id', authMiddleware, requireRole('admin'), adminTestController.deleteTest);

// PATCH /api/admin/tests/:id/configuration
router.patch('/:id/configuration', authMiddleware, requireRole('admin'), adminTestController.updateTestConfiguration);

// PATCH /api/admin/tests/:id/availability
router.patch('/:id/availability', authMiddleware, requireRole('admin'), adminTestController.updateTestAvailability);

module.exports = router;
