const express = require('express');
const router = express.Router();
const dbmsQuestionController = require('../../controllers/core-cs/dbmsQuestionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── USER ROUTES (Read-only, answers stripped) ──
// /api/core-cs/dbms/questions/:chapterSlug/:testId
router.get('/:chapterSlug/:testId', authMiddleware, dbmsQuestionController.getQuestionsForTest);


// ── ADMIN ROUTES (Write & Full Read) ──
// /api/core-cs/dbms/questions
router.post('/', authMiddleware, requireRole('admin'), dbmsQuestionController.createQuestion);

// /api/core-cs/dbms/questions/admin/:chapterSlug/:testId
router.get('/admin/:chapterSlug/:testId', authMiddleware, requireRole('admin'), dbmsQuestionController.getQuestionsByTestAdmin);

// /api/core-cs/dbms/questions/:id
router.route('/:id')
  .get(authMiddleware, requireRole('admin'), dbmsQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), dbmsQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), dbmsQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), dbmsQuestionController.deleteQuestion);

module.exports = router;
