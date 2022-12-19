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

  validateMongoDbId(id)

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

  validateMongoDbId(id)

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
    // Filtración
    const queryObj = { ...req.query }
    const excludeFields = ['page', 'sort', 'fields', 'limit']
    excludeFields.forEach(el => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

    let query = Product.find(JSON.parse(queryStr))

    // Clasificación
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    // Limitando los campos

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }

    // Paginación

    const page = req.query.page
    const limit = req.query.limit
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(limit)

    if (req.query.page) {
      const productCount = await Product.countDocuments()
      if (skip >= productCount) throw new Error('This Page does not exists')
    }

    const product = await query

    res.json(product)
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