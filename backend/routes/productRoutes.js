import express from 'express';
import {addProduct,updateProductQuantity,getProducts} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, addProduct);
router.put('/:id/quantity', authMiddleware, updateProductQuantity);
router.get('/', authMiddleware, getProducts);

export default router;