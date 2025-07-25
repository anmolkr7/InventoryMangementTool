import express from 'express';
import {addProduct,updateProductQuantity,getProducts} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();




/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               sku:
 *                 type: string
 *               image_url:
 *                 type: string
 *                 description: URL of the product image (optional)
 *               description:
 *                 type: string
 *                 description: A brief description of the product (optional)
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *           example:
 *             name: "Gaming Laptop"
 *             type: "Electronics"
 *             sku: "GL-2025"
 *             image_url: "http://example.com/gaming-laptop.jpg"
 *             description: "High-performance gaming laptop with RGB keyboard."
 *             quantity: 25
 *             price: 1499.99
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/products', authMiddleware, addProduct);

/**
 * @swagger
 * /products/{id}/quantity:
 *   put:
 *     summary: Update a product's quantity
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *           example:
 *             quantity: 20
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 */
router.put('/products/:id/quantity', authMiddleware, updateProductQuantity);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   sku:
 *                     type: string
 *                   image_url:
 *                     type: string
 *                   description:
 *                     type: string
 *                   quantity:
 *                     type: integer
 *                   price:
 *                     type: number
 *       401:
 *         description: Unauthorized
 */
router.get('/products', authMiddleware, getProducts);

export default router;