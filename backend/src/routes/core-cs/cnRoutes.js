const express = require('express');
const router = express.Router();
const cnQuestionController = require('../../controllers/core-cs/cnQuestionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── USER ROUTES (Read-only, answers stripped) ──
// /api/core-cs/cn/questions/:chapterSlug/:testId
router.get('/:chapterSlug/:testId', authMiddleware, cnQuestionController.getQuestionsForTest);


// ── ADMIN ROUTES (Write & Full Read) ──
// /api/core-cs/cn/questions
router.post('/', authMiddleware, requireRole('admin'), cnQuestionController.createQuestion);

// /api/core-cs/cn/questions/admin/:chapterSlug/:testId
router.get('/admin/:chapterSlug/:testId', authMiddleware, requireRole('admin'), cnQuestionController.getQuestionsByTestAdmin);

// /api/core-cs/cn/questions/:id
router.route('/:id')
  .get(authMiddleware, requireRole('admin'), cnQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), cnQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), cnQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), cnQuestionController.deleteQuestion);

module.exports = router;
