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
const helmet   = require('helmet');
const rateLimit = require('express-rate-limit');

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

if (process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1);
}

// ── Security Middleware ─────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  },
  hsts: process.env.NODE_ENV === 'production' ? { maxAge: 31536000, includeSubDomains: true } : false,
  frameguard: { action: 'deny' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  noSniff: true
}));

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.FRONTEND_URL || 'https://preorbit.app']
  : ['http://localhost:4200'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Rate Limiting ───────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', globalLimiter);
app.use('/api/auth', authLimiter);

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
    // Required Secret Checks
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'secret' || process.env.JWT_SECRET === 'development' || process.env.JWT_SECRET === '123456') {
        console.error('\n❌ CRITICAL: Insecure or missing JWT_SECRET in production. Server refused to start.');
        process.exit(1);
      }
    }

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
