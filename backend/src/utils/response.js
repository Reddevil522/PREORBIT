// ============================================================
// PREORBIT — API Response Helpers
// ============================================================
// Every controller must use these helpers to ensure all API
// responses follow a consistent structure.
//
// Success format:
// { "success": true,  "message": "...", "data": { ... } }
//
// Error format:
// { "success": false, "message": "..." }
// ============================================================

/**
 * Send a successful JSON response.
 *
 * @param {import('express').Response} res
 * @param {number}  statusCode - HTTP status (default 200)
 * @param {string}  message    - Human-readable success message
 * @param {object}  [data]     - Optional payload
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Send an error JSON response.
 *
 * @param {import('express').Response} res
 * @param {number}  statusCode - HTTP status (default 500)
 * @param {string}  message    - Human-readable error message
 */
const sendError = (res, statusCode = 500, message = 'Internal Server Error') => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { sendSuccess, sendError };
