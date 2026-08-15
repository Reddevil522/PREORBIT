// ============================================================
// PREORBIT — Database Configuration (MongoDB + Mongoose)
// ============================================================

const mongoose = require('mongoose');

/**
 * Connects to MongoDB using the URI from environment variables.
 *
 * Flow: called once during server startup, before Express listens.
 * The server must NOT start if this function throws.
 */
const connectDatabase = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI is not defined in environment variables. ' +
      'Check your .env file.'
    );
  }

  try {
    const connection = await mongoose.connect(uri);

    console.log(
      `✅ PREORBIT Database Connected — Host: ${connection.connection.host}`
    );
  } catch (error) {
    console.error('❌ PREORBIT Database Connection Failed:', error.message);
    // Re-throw so server.js can handle the failure (do not swallow)
    throw error;
  }
};

/**
 * Returns the current mongoose connection state as a human-readable string.
 *
 * States:
 *   0 = disconnected
 *   1 = connected
 *   2 = connecting
 *   3 = disconnecting
 */
const getDatabaseStatus = () => {
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return stateMap[mongoose.connection.readyState] ?? 'unknown';
};

module.exports = { connectDatabase, getDatabaseStatus };
