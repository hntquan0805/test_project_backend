'use strict';

import express from 'express';
import scoreRoutes from './routes/Score.routes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ── Routes ──
app.use('/api/score', scoreRoutes);

// ── Global Error Handler ──
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.statusCode ?? 500).json({
    success: false,
    message: err.message ?? 'Internal Server Error',
  });
});

app.use(cors({
  origin: ['https://yourdomain.com', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;