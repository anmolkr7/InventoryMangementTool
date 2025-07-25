import Product from '../models/product.js';
import mongoose from 'mongoose';
// POST /products - Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, type, sku, image_url, description, quantity, price } = req.body;

    // Validate input
    if (!name || !type || !sku || quantity === undefined || price === undefined) {
      return res.status(400).json({ error: 'Name, type, SKU, quantity, and price are required' });
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be a non-negative integer' });
    }
    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a non-negative number' });
    }

    // Checking for duplicate SKU
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ error: 'SKU already exists' });
    }

    // Creating and saving product
    const newProduct = new Product({
      name,
      type,
      sku,
      image_url: image_url || '',
      description: description || '',
      quantity,
      price,
    });
    await newProduct.save();

    return res.status(201).json({
      id: newProduct._id,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error('Add product error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /products/{id}/quantity - Update product quantity
export const updateProductQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

     
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Product not found' }); 
    }
    
    
    // Validate input
    if (quantity === undefined || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be a non-negative integer' });
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { quantity },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Quantity updated successfully',
      product: {
        id: updatedProduct._id,
        name: updatedProduct.name,
        quantity: updatedProduct.quantity,
      },
    });
  } catch (error) {
    console.error('Update quantity error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /products - Get products with pagination
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate pagination
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Page and limit must be positive integers' });
    }

    const skip = (page - 1) * limit;
    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .select('name type sku image_url description quantity price');

    return res.status(200).json({
      products,
      pagination: {
        page,
        limit,
        total: totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};