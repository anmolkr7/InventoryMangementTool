import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(productRoutes);

export default app;
