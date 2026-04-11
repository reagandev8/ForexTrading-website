import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    console.log("Origin:", origin);

    // allow all localhost during dev
    if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
      return callback(null, true);
    }

    // allow your production frontend
    if (origin === "https://forex-trading-website-one.vercel.app") {
      return callback(null, true);
    }

    console.log("❌ Blocked:", origin);
    return callback(null, true); // TEMP: allow to debug
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Example route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
