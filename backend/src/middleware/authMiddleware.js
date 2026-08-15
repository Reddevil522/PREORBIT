// ============================================================
// PREORBIT — Auth Middleware
// ============================================================
// Verifies JWT and attaches decoded user data to req.user.
//
// Usage (on protected routes):
//   router.get('/protected', authMiddleware, controller.handler);
// ============================================================

const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');

/**
 * Middleware that protects routes by verifying a Bearer JWT.
 *
 * On success: attaches { userId, email, role } to req.user and calls next().
 * On failure: responds 401 immediately — request is rejected.
 *
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect "Authorization: Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return sendError(res, 401, 'Access denied. Token is malformed.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach only the essential payload — not the full user document
    const extractedId = decoded.userId || decoded.id || decoded._id;
    req.user = {
      userId: extractedId,
      id:     extractedId,
      email:  decoded.email,
      role:   decoded.role,
    };

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 401, 'Session expired. Please log in again.');
    }
    return sendError(res, 401, 'Invalid token. Access denied.');
  }
};

module.exports = authMiddleware;
