const express = require('express')
const { model } = require('mongoose')
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory
} = require('../controller/prodcategoryCtrl')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const router = express.Router()

// Agregar una categoría ------------------------------------------------------
router.post('/', authMiddleware, isAdmin, createCategory)

// Actualizar una categoría --------------------------------
router.put('/:id', authMiddleware, isAdmin, updateCategory)

// Eliminara una Categoria --------------------------------
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)

// Obtener una Categoria --------------------------------
router.get('/:id', getCategory)

// Obtener todas las Categoria --------------------------------
router.get('/', getallCategory)

module.exports = router
