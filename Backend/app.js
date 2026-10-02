const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, Postman) or matching allowed origins
    const allowed = [
      'http://127.0.0.1:3006', 'http://localhost:3006',
      'http://127.0.0.1:3007', 'http://localhost:3007',  // live-server fallback
      'http://127.0.0.1:5500', 'http://localhost:5500',  // VS Code Live Server
      null // file:// direct open
    ];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in dev mode
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight for all routes
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Placement Guidance System API is running...');
});

// Health-check — used by frontend to detect if backend is live
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Define Routes
app.use('/api/students', require('./routes/studentRoute'));
app.use('/api/companies', require('./routes/companyRoute'));
// app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/analysis', require('./routes/analysisRoute'));

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
