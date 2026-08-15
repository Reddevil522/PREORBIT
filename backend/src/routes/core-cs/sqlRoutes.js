const express = require('express');
const router = express.Router();
const sqlQuestionController = require('../../controllers/core-cs/sqlQuestionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── USER ROUTES (Read-only, answers stripped) ──
// /api/core-cs/sql/questions/:chapterSlug/:testId
router.get('/:chapterSlug/:testId', authMiddleware, sqlQuestionController.getQuestionsForTest);


// ── ADMIN ROUTES (Write & Full Read) ──
// /api/core-cs/sql/questions
router.post('/', authMiddleware, requireRole('admin'), sqlQuestionController.createQuestion);

// /api/core-cs/sql/questions/admin/:chapterSlug/:testId
router.get('/admin/:chapterSlug/:testId', authMiddleware, requireRole('admin'), sqlQuestionController.getQuestionsByTestAdmin);

// /api/core-cs/sql/questions/:id
router.route('/:id')
  .get(authMiddleware, requireRole('admin'), sqlQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), sqlQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), sqlQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), sqlQuestionController.deleteQuestion);

module.exports = router;
