const express = require('express');
const router = express.Router();
const oopQuestionController = require('../../controllers/core-cs/oopQuestionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── USER ROUTES (Read-only, answers stripped) ──
// /api/core-cs/oop/questions/:chapterSlug/:testId
router.get('/:chapterSlug/:testId', authMiddleware, oopQuestionController.getQuestionsForTest);


// ── ADMIN ROUTES (Write & Full Read) ──
// /api/core-cs/oop/questions
router.post('/', authMiddleware, requireRole('admin'), oopQuestionController.createQuestion);

// /api/core-cs/oop/questions/admin/:chapterSlug/:testId
router.get('/admin/:chapterSlug/:testId', authMiddleware, requireRole('admin'), oopQuestionController.getQuestionsByTestAdmin);

// /api/core-cs/oop/questions/:id
router.route('/:id')
  .get(authMiddleware, requireRole('admin'), oopQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), oopQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), oopQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), oopQuestionController.deleteQuestion);

module.exports = router;
