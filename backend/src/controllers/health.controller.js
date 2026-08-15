// ============================================================
// PREORBIT — Health Check Controller
// ============================================================

const { getDatabaseStatus } = require('../config/database');
const { sendSuccess }       = require('../utils/response');

/**
 * GET /api/health
 *
 * Returns the operational status of the PREORBIT API
 * including a live database connection state.
 */
const getHealth = (req, res) => {
  sendSuccess(res, 200, 'PREORBIT API is running', {
    database:    getDatabaseStatus(),
    timestamp:   new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
};

module.exports = { getHealth };
