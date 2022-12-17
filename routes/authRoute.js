const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const {
  createUser,
  loginUser,
  getAllUser,
  getaUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout
} = require('../controller/userCtrl')

// Crear Un Usuario  ----------------------------------------------
router.post('/register', createUser)

// Inicia sesión un usuario ----------------------------------------------
router.post('/login', loginUser)

// Eliminar un Usuario ----------------------------------------------
router.delete('/:id', deleteUser)

//Cerrar sesión de usuario ------------------------------
router.get('/logout', logout)

// Consigue todos los usuarios ----------------------------------------------
router.get('/all-users', getAllUser)

//Manejar el token de actualización ------------------------------
router.get('/refresh', handleRefreshToken)

// Obtener un solo usuario ----------------------------------------------
router.get('/:id', authMiddleware, isAdmin, getaUser)

// Actualizar un usuario ----------------------------------------------
router.put('/edit-user', authMiddleware, updatedUser)

// Bloquear usuario ----------------------------------------------
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)

// Desbloquear usuario ------------------------------
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router
