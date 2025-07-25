import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

export default app;
