const express = require('express')
const {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon
} = require('../controller/couponCtrl')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

// Cear Coupon ----------------------------------------------------------------
router.post('/', authMiddleware, isAdmin, createCoupon)

// get All Coupons ----------------------------------------------------------------
router.get('/', authMiddleware, isAdmin, getAllCoupons)

// update Coupon ----------------------------------------------------------------
router.put('/:id', authMiddleware, isAdmin, updateCoupon)

// delete Coupon ----------------------------------------------------------------
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon)

module.exports = router
