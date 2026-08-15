// ============================================================
// PREORBIT — Role Authorization Middleware
// ============================================================
// Used AFTER authMiddleware to restrict routes by role.
//
// Usage on a route that only admins can access:
//   router.get('/admin/data', authMiddleware, requireRole('admin'), handler);
//
// Usage on a route that any authenticated user can access:
//   router.get('/profile', authMiddleware, requireRole('user', 'admin'), handler);
// ============================================================

const { sendError } = require('../utils/response');

/**
 * Factory middleware — returns an Express middleware function that
 * allows access only to users whose role is in the allowedRoles list.
 *
 * Must always be chained AFTER authMiddleware so that req.user is populated.
 *
 * @param {...string} allowedRoles - One or more permitted roles
 * @returns {import('express').RequestHandler}
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    // authMiddleware must have run first — req.user must be set
    if (!req.user) {
      return sendError(res, 401, 'Unauthorized. Please log in.');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        `Access denied. Required role: ${allowedRoles.join(' or ')}`
      );
    }

    next();
  };
};

module.exports = { requireRole };
