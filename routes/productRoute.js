const express = require('express')
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages
} = require('../controller/productCtrl')
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware')
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImage')
const router = express.Router()

// Consigue un producto ------------------------------------------------------------
router.get('/', getAllProduct)

router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
// Obtener todo los producto ------------------------------------------------------------
router.get('/:id', getaProduct)

// Añadir a la lista de deseos ------------------------------------------------------------
router.put('/wishlist', authMiddleware, addToWishlist)

// Añadir a la lista de deseos ------------------------------------------------------------
router.put('/rating', authMiddleware, rating)

// Crear nuevo Productos ------------------------------------------------------------
router.post('/', authMiddleware, isAdmin, createProduct)

// Eliminar un producto ------------------------------------------------------------
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)

// Actualizar un producto ------------------------------------------------------------
router.put('/:id', authMiddleware, isAdmin, updateProduct)

module.exports = router
