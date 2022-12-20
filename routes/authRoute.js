const express = require('express')
const router = express.Router()
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const {
  createUser,
  forgotPasswordToken,
  resetPassword,
  updatePassword,
  loginUser,
  loginAdmin,
  userCart,
  applyCoupon,
  createOrder,
  getAllUser,
  getOrders,
  handleRefreshToken,
  logout,
  getWishlist,
  getUserCart,
  getaUser,
  emptyCart,
  deleteUser,
  updateOrderStatus,
  updatedUser,
  saveAddress,
  blockUser,
  unblockUser
} = require('../controller/userCtrl')

// Create a User ----------------------------------------------
router.post('/register', createUser)

// forgot Password Token ----------------------------------------------
router.post('/forgot-password-token', forgotPasswordToken)

// reset Password ----------------------------------------------
router.put('/reset-password/:token', resetPassword)

// Update Password ----------------------------------------------
router.put('/password', authMiddleware, updatePassword)

// Login a User ----------------------------------------------
router.post('/login', loginUser)

// admin login ----------------------------------------------
router.post('/admin-login', loginAdmin)

// get User Cart --------------------------------
router.post('/cart', authMiddleware, userCart)

// apply Coupon ------------------------------------------------
router.post('/cart/applycoupon', authMiddleware, applyCoupon)

// create Order ----------------------------------------
router.post('/cart/cash-order', authMiddleware, createOrder)

// Get All Users ----------------------------------------------
router.get('/all-users', getAllUser)

// get Orders -----------------------------------------------------------
router.get('/get-orders', authMiddleware, getOrders)

// handle refresh token ----------------------------------------------
router.get('/refresh', handleRefreshToken)

// Logout User ----------------------------------------------
router.get('/logout', logout)

// get Wishlist --------------------------------
router.get('/wishlist', authMiddleware, getWishlist)

// get User Cart --------------------------------
router.get('/cart', authMiddleware, getUserCart)

// Get a Single user ----------------------------------------------
router.get('/:id', authMiddleware, isAdmin, getaUser)

// empty Cart --------------------------------
router.delete('/empty-cart', authMiddleware, emptyCart)

// Delete a User ----------------------------------------------
router.delete('/:id', deleteUser)
router.put(
  '/order/update-order/:id',
  authMiddleware,
  isAdmin,
  updateOrderStatus
)

// Update a user ----------------------------------------------
router.put('/edit-user', authMiddleware, updatedUser)

// save user Address --------------------------------------------------------------
router.put('/save-address', authMiddleware, saveAddress)

// Block User ----------------------------------------------
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)

// Unblock User ----------------------------------------------
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router
