// ============================================================
// PREORBIT — Central Error Handler Middleware
// ============================================================

/**
 * Express error-handling middleware (4 arguments required by Express).
 *
 * Handles:
 *   - 404 Not Found (from notFound.js)
 *   - Mongoose CastError (invalid ObjectId)
 *   - Mongoose ValidationError (schema validation failures)
 *   - Mongoose Duplicate Key Error (code 11000)
 *   - Generic API / server errors
 *
 * All error responses follow the PREORBIT standard format:
 * {
 *   "success": false,
 *   "message": "<human-readable message>"
 * }
 *
 * @param {Error}  err
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || err.statusCode || 500;
  let message    = err.message || 'Internal Server Error';

  // ── Mongoose: Invalid ObjectId ─────────────────────────────
  if (err.name === 'CastError') {
    statusCode = 400;
    message    = `Invalid value for field: ${err.path}`;
  }

  // ── Mongoose: Validation Errors ────────────────────────────
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const fields = Object.values(err.errors).map((e) => e.message);
    message = fields.join(', ');
  }

  // ── Mongoose: Duplicate Key ────────────────────────────────
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue ?? {})[0] ?? 'field';
    message = `Duplicate value: ${field} already exists`;
  }

  // ── Log to console in development only ────────────────────
  console.error(`[PREORBIT Error] ${statusCode} — ${message}`, err);
  if (process.env.NODE_ENV !== 'production') {
    if (statusCode === 500) {
      console.error(err.stack);
    }
  }

  const responsePayload = {
    success: false,
    message
  };

  if (process.env.NODE_ENV !== 'production') {
    responsePayload.devErrorDetails = err.stack;
    responsePayload.devErrObj = err;
  }

  res.status(statusCode).json(responsePayload);
};

module.exports = errorHandler;
