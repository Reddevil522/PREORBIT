const express = require('express');
const router = express.Router();
const osQuestionController = require('../../controllers/core-cs/osQuestionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── USER ROUTES (Read-only, answers stripped) ──
// /api/core-cs/os/questions/:chapterSlug/:testId
router.get('/:chapterSlug/:testId', authMiddleware, osQuestionController.getQuestionsForTest);


// ── ADMIN ROUTES (Write & Full Read) ──
// /api/core-cs/os/questions
router.post('/', authMiddleware, requireRole('admin'), osQuestionController.createQuestion);

// /api/core-cs/os/questions/admin/:chapterSlug/:testId
router.get('/admin/:chapterSlug/:testId', authMiddleware, requireRole('admin'), osQuestionController.getQuestionsByTestAdmin);

// /api/core-cs/os/questions/:id
router.route('/:id')
  .get(authMiddleware, requireRole('admin'), osQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), osQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), osQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), osQuestionController.deleteQuestion);

module.exports = router;
