// ============================================================
// PREORBIT — Express Server Entry Point
// ============================================================
// Startup flow:
//   1. Load environment variables
//   2. Connect to MongoDB
//   3. Start Express and begin accepting requests
//
// The server will NOT start if the database connection fails.
// ============================================================

const express  = require('express');
const cors     = require('cors');
const dotenv   = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const { connectDatabase } = require('./config/database');
const notFound            = require('./middleware/notFound');
const errorHandler        = require('./middleware/errorHandler');

// ── Routers ─────────────────────────────────────────────────
const healthRouter = require('./routes/health.routes');
const authRouter   = require('./routes/authRoutes');
const adminRouter  = require('./routes/adminRoutes');
const javaDSAQuestionRoutes = require('./routes/java-dsa/questionRoutes');
const aptitudeQuestionRoutes = require('./routes/aptitude/questionRoutes');
const oopQuestionRoutes = require('./routes/core-cs/oopRoutes');
const dbmsQuestionRoutes = require('./routes/core-cs/dbmsRoutes');
const osQuestionRoutes = require('./routes/core-cs/osRoutes');
const cnQuestionRoutes = require('./routes/core-cs/cnRoutes');
const sqlQuestionRoutes = require('./routes/core-cs/sqlRoutes');
const importRoutes = require('./routes/admin/importRoutes');
const adminTestRoutes = require('./routes/admin/testRoutes');
const testRoutes = require('./routes/testRoutes');
const progressRoutes   = require('./routes/progressRoutes');
const careerRoutes     = require('./routes/careerRoutes');
const placementRoutes  = require('./routes/placementRoutes');

// ── Create Express app ───────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ── API Routes ──────────────────────────────────────────────
app.use('/api',        healthRouter);
app.use('/api/auth',   authRouter);
app.use('/api/admin',  adminRouter);
app.use('/api/tests',  testRoutes);
app.use('/api/progress',   progressRoutes);
app.use('/api/career',     careerRoutes);
app.use('/api/placement',  placementRoutes);

app.use('/api/java-dsa/questions', javaDSAQuestionRoutes);
app.use('/api/aptitude/questions', aptitudeQuestionRoutes);
app.use('/api/core-cs/oop/questions', oopQuestionRoutes);
app.use('/api/core-cs/dbms/questions', dbmsQuestionRoutes);
app.use('/api/core-cs/os/questions', osQuestionRoutes);
app.use('/api/core-cs/cn/questions', cnQuestionRoutes);
app.use('/api/core-cs/sql/questions', sqlQuestionRoutes);

// Admin Import Routes
app.use('/api/admin/import', importRoutes);
app.use('/api/admin/tests', adminTestRoutes);

// ── 404 + Error Handlers (must be LAST) ─────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Step 2 & 3: Connect DB then start server ─────────────────
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDatabase();

    // Only start Express after DB is ready
    app.listen(PORT, () => {
      console.log(`\n🚀 PREORBIT API is running`);
      console.log(`   → http://localhost:${PORT}`);
      console.log(`   → Health: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('\n❌ PREORBIT failed to start:', error.message);
    process.exit(1); // Exit with failure code — do not run without DB
  }
};

startServer();

module.exports = app;
