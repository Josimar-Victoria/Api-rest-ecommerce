const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const validateMongoDbId = require('../utils/validateMongoDbId')

// Create a new product ------------------------------------------------------------
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)

    res.json(newProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Update a product ------------------------------------------------------------
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
//   validateMongoDbId(id)
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title)
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.json({ msg: 'Product a uptade', updateProduct })
  } catch (error) {
    throw new Error(error)
  }
})

// Delete a product ------------------------------------------------------------
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  validateMongoDbId(id)
  try {
    const deleteProduct = await Product.findByIdAndDelete(id)
    res.json({ msg: 'Delete Product', deleteProduct })
  } catch (error) {
    throw new Error(error)
  }
})

// Get one product ------------------------------------------------------------
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const findProduct = await Product.findById(id)

    res.json(findProduct)
  } catch (error) {
    throw new Error(error)
  }
})

// Get All product ------------------------------------------------------------
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getAllProducts = await Product.find()

    res.json(getAllProducts)
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
}
