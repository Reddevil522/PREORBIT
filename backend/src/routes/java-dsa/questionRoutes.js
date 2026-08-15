const express = require('express');
const router = express.Router();
const javaDSAQuestionController = require('../../controllers/java-dsa/javaDSAQuestionController');
const authMiddleware = require('../../middleware/authMiddleware');
const { requireRole } = require('../../middleware/roleMiddleware');

// ── USER ROUTES (Read-only, answers stripped) ──
// /api/java-dsa/questions/:chapterSlug/:testId
router.get('/:chapterSlug/:testId', authMiddleware, javaDSAQuestionController.getQuestionsForTest);


// ── ADMIN ROUTES (Write & Full Read) ──
// /api/java-dsa/questions
router.post('/', authMiddleware, requireRole('admin'), javaDSAQuestionController.createQuestion);

// /api/java-dsa/questions/admin/:chapterSlug/:testId
router.get('/admin/:chapterSlug/:testId', authMiddleware, requireRole('admin'), javaDSAQuestionController.getQuestionsByTestAdmin);

// /api/java-dsa/questions/:id
router.route('/:id')
  .get(authMiddleware, requireRole('admin'), javaDSAQuestionController.getQuestionById)
  .put(authMiddleware, requireRole('admin'), javaDSAQuestionController.updateQuestion)
  .patch(authMiddleware, requireRole('admin'), javaDSAQuestionController.updateQuestion)
  .delete(authMiddleware, requireRole('admin'), javaDSAQuestionController.deleteQuestion);

module.exports = router;
