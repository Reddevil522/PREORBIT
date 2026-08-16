const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', progressController.getProgress);
router.post('/theory/:chapterSlug', progressController.markTheoryCompleted);

module.exports = router;
