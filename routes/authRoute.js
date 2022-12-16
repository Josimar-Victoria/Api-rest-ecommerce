const express = require('express')
const {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  deleteUser,
  updateUser
} = require('../controller/userCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

// Crear Un Usuario  ----------------------------------------------
router.post('/register', createUser)

// Inicia sesión un usuario ----------------------------------------------
router.post('/login', loginUser)

// Consigue todos los usuarios ----------------------------------------------
router.get('/all-users', getAllUser)

// Obtener un solo usuario ----------------------------------------------
router.get('/:id', authMiddleware, isAdmin, getaUser)

// Eliminar un Usuario ----------------------------------------------
router.delete('/:id', deleteUser)

// Actualizar un usuario ----------------------------------------------
router.put('/:id', updateUser)

module.exports = router
