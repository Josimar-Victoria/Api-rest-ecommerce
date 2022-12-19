const express = require('express')
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlogs,
  liketheBlog,
  disliketheBlog
} = require('../controller/blogCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

//  me gusta el blog ------------------------------
router.put('/likes', authMiddleware, liketheBlog)

// no me gusta el blog  ------------------------------
router.put('/dislikes', authMiddleware, disliketheBlog)

// Crear un Blog  ------------------------------
router.post('/', authMiddleware, createBlog)

// Actualizar un Blog ------------------------------
router.put('/:id', authMiddleware, updateBlog)

// Obtener un blog ------------------------------
router.get('/:id', getBlog)

// Obtener todo el blog ------------------------------
router.get('/', getAllBlogs)

// Eliminar un Blog ------------------------------
router.delete('/:id', authMiddleware, deleteBlogs)

module.exports = router
