const express = require('express');
const router = express.Router();
const userTestController = require('../controllers/userTestController');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/tests/summary
// Authenticated route to get test summary (available and completed counts) for a specific module/subject
router.get('/summary', authMiddleware, userTestController.getTestSummary);

// GET /api/tests
// Public (user) route to get available tests
router.get('/', authMiddleware, userTestController.getAvailableTests);

// GET /api/tests/:testId/metadata
// Authenticated route to get test metadata only (for instructions page)
router.get('/:testId/metadata', authMiddleware, userTestController.getTestMetadata);

// POST /api/tests/:testId/start
// Authenticated route to start a test (loads metadata and questions securely)
router.post('/:testId/start', authMiddleware, userTestController.startTest);

// GET /api/tests/:testId/resume
// Authenticated route to resume an existing test attempt
router.get('/:testId/resume', authMiddleware, userTestController.resumeTest);

// PUT /api/tests/:testId/attempts/:attemptId/save-answer
// Authenticated route to auto-save a single answer
router.put('/:testId/attempts/:attemptId/save-answer', authMiddleware, userTestController.saveAnswer);

// POST /api/tests/:testId/submit
// Authenticated route to submit a test attempt
router.post('/:testId/submit', authMiddleware, userTestController.submitTest);

// POST /api/tests/:testId/retake
// Authenticated route to retake a test attempt
router.post('/:testId/retake', authMiddleware, userTestController.retakeTest);

// GET /api/tests/attempts/:attemptId/result
// Authenticated route to view test result
router.get('/attempts/:attemptId/result', authMiddleware, userTestController.getTestResult);

module.exports = router;
