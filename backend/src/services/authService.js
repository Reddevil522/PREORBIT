// ============================================================
// PREORBIT — Auth Service
// ============================================================
// Business logic for user and admin authentication.
//
// Login flow:
//   1. Check if email matches ADMIN_EMAIL (env)
//   2. If admin: compare plain password with ADMIN_PASSWORD (env)
//      → generate admin JWT (role: 'admin', userId: 'admin')
//   3. If not admin: find user in MongoDB, bcrypt-compare, generate JWT
//
// Admin credentials are ONLY stored in environment variables.
// Admin is never stored in MongoDB.
// ============================================================

const jwt    = require('jsonwebtoken');
const crypto = require('crypto');
const User   = require('../models/User');

// ── Token generator ──────────────────────────────────────────

/**
 * Generates a signed JWT.
 *
 * @param {{ userId: string, email: string, role: string }} payload
 * @returns {string} Signed JWT (7-day expiry)
 */
const generateToken = ({ userId, email, role }) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ── Timing-safe string comparison ───────────────────────────
// Prevents timing-based attacks when comparing admin credentials.
const timingSafeEqual = (a, b) => {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) {
    // Still run the comparison to prevent length-based timing leaks
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
};

// ── Register ─────────────────────────────────────────────────

/**
 * Registers a new student user.
 * Admin cannot register — admin is env-only.
 *
 * @param {{ name: string, email: string, password: string }} data
 * @returns {Promise<{ user: object }>}
 * @throws {Error} If email already exists or email matches admin
 */
const registerUser = async ({ name, email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Block registration with the admin email
  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  if (normalizedEmail === adminEmail) {
    const error = new Error('This email cannot be used for registration');
    error.status = 403;
    throw error;
  }

  const existing = await User.findOne({ email: normalizedEmail });
  if (existing) {
    const error = new Error('An account with this email already exists');
    error.status = 409;
    throw error;
  }

  const user = await User.create({ name, email: normalizedEmail, password });
  return { user };
};

// ── Login ────────────────────────────────────────────────────

/**
 * Unified login handler — resolves to either an admin token or a
 * MongoDB user token based on credentials.
 *
 * Admin path:
 *   - email matches ADMIN_EMAIL (env)
 *   - password matches ADMIN_PASSWORD (env, plain-text timing-safe compare)
 *   - Never touches MongoDB
 *   - Returns role: 'admin', userId: 'admin'
 *
 * User path:
 *   - Standard MongoDB lookup + bcrypt compare
 *   - Returns role: 'user' (or whatever the DB document has)
 *
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: { name?: string, email: string, role: string } }>}
 * @throws {Error} 401 on any invalid credentials
 */
const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  const adminEmail    = (process.env.ADMIN_EMAIL    || '').toLowerCase().trim();
  const adminPassword =  process.env.ADMIN_PASSWORD || '';

  // ── Admin path ───────────────────────────────────────────────
  if (normalizedEmail === adminEmail) {
    const passwordMatch = timingSafeEqual(password, adminPassword);

    if (!passwordMatch) {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }

    const token = generateToken({
      userId: 'admin',
      email:  normalizedEmail,
      role:   'admin',
    });

    return {
      token,
      user: {
        name:  'Admin',
        email: normalizedEmail,
        role:  'admin',
      },
    };
  }

  // ── User path ────────────────────────────────────────────────
  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const token = generateToken({
    userId: user._id.toString(),
    email:  user.email,
    role:   user.role,
  });

  return {
    token,
    user: {
      name:  user.name,
      email: user.email,
      role:  user.role,
    },
  };
};

module.exports = { registerUser, loginUser };
