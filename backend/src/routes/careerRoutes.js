// ============================================================
// PREORBIT — Career Routes (v2)
// ============================================================

const express        = require('express');
const router         = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const careerCtrl     = require('../controllers/careerController');

// All career routes require authentication
router.use(authMiddleware);

// Specific named routes BEFORE /:id param routes
router.get('/summary',        careerCtrl.getCareerSummary);
router.post('/:id/track',     careerCtrl.trackApplication);  // before /:id GET

router.get('/',               careerCtrl.getCareerLinks);
router.post('/',              careerCtrl.createCareerLink);
router.put('/:id',            careerCtrl.updateCareerLink);
router.delete('/:id',         careerCtrl.deleteCareerLink);

module.exports = router;
