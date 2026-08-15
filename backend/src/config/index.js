// ============================================================
// PREORBIT — Application Configuration
// ============================================================
// All values sourced from environment variables.
// No secrets or real values are ever hardcoded here.

module.exports = {
  port:        process.env.PORT        || 5000,
  nodeEnv:     process.env.NODE_ENV    || 'development',
  mongodbUri:  process.env.MONGODB_URI || '',
  jwtSecret:   process.env.JWT_SECRET  || '',
  adminEmail:  process.env.ADMIN_EMAIL || '',
};
