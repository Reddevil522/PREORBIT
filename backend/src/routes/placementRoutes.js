// ============================================================
// PREORBIT — Placement Routes (v2)
// ============================================================

const express        = require('express');
const router         = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const placementCtrl  = require('../controllers/placementController');

// All placement routes require authentication
router.use(authMiddleware);

// Specific named routes BEFORE /:id param routes
router.get('/summary',   placementCtrl.getPlacementSummary);
router.get('/analytics', placementCtrl.getAnalytics);

router.get('/',       placementCtrl.getApplications);
router.post('/',      placementCtrl.createApplication);
router.put('/:id',    placementCtrl.updateApplication);
router.delete('/:id', placementCtrl.deleteApplication);

module.exports = router;
