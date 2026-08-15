// ============================================================
// PREORBIT — Not Found Middleware
// ============================================================

/**
 * Catches all unmatched routes and returns a clean 404 JSON response.
 * Must be registered AFTER all valid route definitions in server.js.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

module.exports = notFound;
