const express = require('express')
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory
} = require('../controller/blogCatCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

// Create Category --------------------------------
router.post('/', authMiddleware, isAdmin, createCategory)

// Update Category --------------------------------
router.put('/:id', authMiddleware, isAdmin, updateCategory)

// Delete Category --------------------------------
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)

// Get Category ------------------------------------------------
router.get('/:id', getCategory)

// Get all Category ------------------------------------------------
router.get('/', getallCategory)

module.exports = router
