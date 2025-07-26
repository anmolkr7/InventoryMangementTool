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
 *     summary: Get a list of products
 *     description: |
 *       Retrieves a list of products.
 *       - If `page` or `limit` query parameters are provided, it returns a paginated response.
 *       - If no query parameters are provided, it returns a simple array of all products to maintain compatibility with the test script.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to retrieve per page.
 *     responses:
 *       200:
 *         description: A successful response.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                 - type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           quantity:
 *                             type: integer
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         currentPage:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                         totalProducts:
 *                           type: integer
 *       401:
 *         description: Unauthorized
 */
router.get('/products', authMiddleware, getProducts);

export default router;