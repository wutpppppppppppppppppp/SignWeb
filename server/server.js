import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRoutes from './routes/userRoutes';
import rokokoRoutes from './routes/rokokoRoutes';

const app = express();

app.use(express.json());
// app level middleware
app.use('/api', userRoutes);
app.use('/api', rokokoRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Connection error', error.message);
  });
