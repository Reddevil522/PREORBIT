const express = require('express');
const router = express.Router();
const aptitudeQuestionController = require('../../controllers/aptitude/aptitudeQuestionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── USER ROUTES (Read-only, answers stripped) ──
// /api/aptitude/questions/:section/:chapterSlug/:testId
router.get('/:section/:chapterSlug/:testId', authMiddleware, aptitudeQuestionController.getQuestionsForTest);


// ── ADMIN ROUTES (Write & Full Read) ──
// /api/aptitude/questions
router.post('/', authMiddleware, requireRole('admin'), aptitudeQuestionController.createQuestion);

// /api/aptitude/questions/admin/:section/:chapterSlug/:testId
router.get('/admin/:section/:chapterSlug/:testId', authMiddleware, requireRole('admin'), aptitudeQuestionController.getQuestionsByTestAdmin);

// /api/aptitude/questions/:id
router.route('/:id')
  .get(authMiddleware, requireRole('admin'), aptitudeQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), aptitudeQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), aptitudeQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), aptitudeQuestionController.deleteQuestion);

module.exports = router;
