const express = require('express')
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlogs,
  liketheBlog,
  disliketheBlog,
  uploadImages
} = require('../controller/blogCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImage')
const router = express.Router()

//  me gusta el blog ------------------------------
router.put('/likes', authMiddleware, liketheBlog)

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadImages
);

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
