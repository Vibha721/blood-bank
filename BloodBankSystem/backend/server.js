import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/database.js';

// Import routes
import donorsRouter from './routes/donors.js';
import requestsRouter from './routes/requests.js';
import inventoryRouter from './routes/inventory.js';
import drivesRouter from './routes/drives.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/donors', donorsRouter);
app.use('/api/requests', requestsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/drives', drivesRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Blood Bank Management System API',
    version: '1.0.0',
    endpoints: {
      donors: '/api/donors',
      requests: '/api/requests',
      inventory: '/api/inventory',
      drives: '/api/drives'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
