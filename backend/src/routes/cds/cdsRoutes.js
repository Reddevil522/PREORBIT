// ============================================================
// PREORBIT — CDS English API Routes
// ============================================================

const express = require('express');
const router = express.Router();

const cdsQuestionController = require('../../controllers/cds/cdsQuestionController');
const cdsTheoryController = require('../../controllers/cds/cdsTheoryController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── Theory Content ───────────────────────────────────────────
// GET /api/cds/theory/:section/:chapterSlug
router.get('/theory/:section/:chapterSlug', authMiddleware, cdsTheoryController.getChapterTheory);

// ── Dashboard Overview ───────────────────────────────────────
// GET /api/cds/dashboard-summary
router.get('/dashboard-summary', authMiddleware, cdsQuestionController.getDashboardSummary);

// ── User Test Questions (Sanitized, answers stripped) ────────
// GET /api/cds/questions/:section/:chapterSlug/:testId
router.get('/questions/:section/:chapterSlug/:testId', authMiddleware, cdsQuestionController.getQuestionsForTest);

// ── Admin: Atomic Test Creation & Publication ────────────────
// POST /api/cds/publish
router.post('/publish', authMiddleware, requireRole('admin'), cdsQuestionController.createAndPublishTest);

// ── Admin: Full Question Inspection & Management ─────────────
// GET /api/cds/questions/admin/:section/:chapterSlug/:testId
router.get('/questions/admin/:section/:chapterSlug/:testId', authMiddleware, requireRole('admin'), cdsQuestionController.getQuestionsByTestAdmin);

// /api/cds/questions/:id
router.route('/questions/:id')
  .get(authMiddleware, requireRole('admin'), cdsQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), cdsQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), cdsQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), cdsQuestionController.deleteQuestion);

module.exports = router;
