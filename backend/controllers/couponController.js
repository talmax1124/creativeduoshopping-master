import Coupon from '../models/couponModel.js'
 import asyncHandler from 'express-async-handler'

 export const createCoupon = asyncHandler(async (req, res) => {
   try {
     const { name, expiry, discount } = req.body
     res.json(await new Coupon({ name, expiry, discount }).save())
   } catch (err) {
     console.log(err)
   }
 })

 export const removeCoupon = asyncHandler(async (req, res) => {
   try {
     res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec())
   } catch (err) {
     console.log(err)
   }
 })

 export const listCoupon = asyncHandler(async (req, res) => {
   try {
     res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec())
   } catch (err) {
     console.log(err)
   }
 })