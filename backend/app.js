import express from 'express';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';


import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';


const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
