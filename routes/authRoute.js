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
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress
} = require('../controller/userCtrl')

// Crear Un Usuario  ----------------------------------------------
router.post('/register', createUser)

// Inicia sesión un usuario ----------------------------------------------
router.post('/login', loginUser)

// Inicio de sesión de administrador ----------------------------------------------
router.post('/admin-login', loginAdmin)

// Olvidé el token de contraseña ----------------------------
router.post('/forgot-password-token', forgotPasswordToken)

// Eliminar un Usuario ----------------------------------------------
router.delete('/:id', deleteUser)

//Cerrar sesión de usuario ------------------------------
router.get('/logout', logout)

// Consigue todos los usuarios ----------------------------------------------
router.get('/all-users', getAllUser)

//Manejar el token de actualización ------------------------------
router.get('/refresh', handleRefreshToken)

// obtener lista de deseos ----------------------------------------------
router.get('/wishlist', authMiddleware, getWishlist)

// Obtener un solo usuario ----------------------------------------------
router.get('/:id', authMiddleware, isAdmin, getaUser)

// Restablecer la contraseña ----------------------------------------------
router.put('/save-address',authMiddleware, saveAddress)

// Actualizar un usuario ----------------------------------------------
router.put('/edit-user', authMiddleware, updatedUser)

// Bloquear usuario ----------------------------------------------
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)

// Desbloquear usuario ------------------------------
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

// Actualiza contraseña ------------------------------
router.put('/password', authMiddleware, updatePassword)

// Restablecer la contraseña ----------------------------------------------
router.put('/reset-password/:token', resetPassword)

module.exports = router
