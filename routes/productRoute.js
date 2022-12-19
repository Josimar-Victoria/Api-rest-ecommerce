const express = require('express')
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} = require('../controller/productCtrl')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router()

// Consigue un producto ------------------------------------------------------------
router.get('/', getAllProduct)

// Obtener todo los producto ------------------------------------------------------------
router.get('/:id', getaProduct)

// Crear nuevo Productos ------------------------------------------------------------
router.post('/', authMiddleware, isAdmin, createProduct)

// Eliminar un producto ------------------------------------------------------------
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)

// Actualizar un producto ------------------------------------------------------------
router.put('/:id', authMiddleware, isAdmin, updateProduct)

module.exports = router
