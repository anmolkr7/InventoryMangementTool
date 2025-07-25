import express from 'express';
import {addProduct,updateProductQuantity,getProducts} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/products', authMiddleware, addProduct);
router.put('/products/:id/quantity', authMiddleware, updateProductQuantity);
router.get('/products', authMiddleware, getProducts);

export default router;