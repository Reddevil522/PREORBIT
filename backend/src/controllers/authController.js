// ============================================================
// PREORBIT — Auth Controller
// ============================================================
// Handles HTTP layer: input validation, calling service, response.
// Business logic lives in authService.js.
// ============================================================

const authService         = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');

// ── Register ─────────────────────────────────────────────────

/**
 * POST /api/auth/register
 *
 * Body: { name, email, password }
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ── Input validation ─────────────────────────────────────
    if (!name || !email || !password) {
      return sendError(res, 400, 'Name, email, and password are required');
    }

    if (password.length < 6) {
      return sendError(res, 400, 'Password must be at least 6 characters');
    }

    // ── Delegate to service ──────────────────────────────────
    await authService.registerUser({ name, email, password });

    return sendSuccess(res, 201, 'User registered successfully');

  } catch (error) {
    next(error); // Passed to central error handler
  }
};

// ── Login ────────────────────────────────────────────────────

/**
 * POST /api/auth/login
 *
 * Body: { email, password }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ── Input validation ─────────────────────────────────────
    if (!email || !password) {
      return sendError(res, 400, 'Email and password are required');
    }

    // ── Delegate to service ──────────────────────────────────
    const { token, user } = await authService.loginUser({ email, password });

    return res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
