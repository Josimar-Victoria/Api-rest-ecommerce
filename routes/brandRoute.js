const express = require('express')
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand
} = require('../controller/brandCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

// crear marca ----------------------------------------------------------------
router.post('/', authMiddleware, isAdmin, createBrand)

// actualizar marca --------------------------------
router.put('/:id', authMiddleware, isAdmin, updateBrand)

// eliminar marca --------------------------------
router.delete('/:id', authMiddleware, isAdmin, deleteBrand)

// obtener marcad --------------------------------
router.get('/:id', getBrand)

// obtener toda las marca --------------------------------
router.get('/', getallBrand)

module.exports = router
