import express from 'express'
 const router = express.Router()

 import { protect, admin } from '../middleware/authMiddleware.js'

 import {
   createCoupon,
   listCoupon,
   removeCoupon,
 } from '../controllers/couponController.js'

 router.route('/').get(listCoupon)
 router.route('/coupon').post(protect, admin, createCoupon)
 router.route('/coupon/:couponId').delete(protect, admin, removeCoupon)

 export default router