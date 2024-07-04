const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const categoryRoutes = require('./routes/categoryRoutes');
const vocabularyRoutes = require('./routes/vocabularyRoutes');
const authRoutes = require('./routes/authRoutes');
const mocapRoutes = require('./routes/mocapRoutes');
const { connectDB } = require('./utils/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to database
connectDB();

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/vocabularies', vocabularyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/mocap', mocapRoutes);

// Error handling middleware
app.use(require('./middlewares/errorMiddleware'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
