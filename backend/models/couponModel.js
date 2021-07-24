import mongoose from 'mongoose'

 const couponSchema = new mongoose.Schema(
   {
     name: {
       type: String,
       trim: true,
       unique: true,
       uppercase: true,
       required: 'name is required',
     },
     expiry: {
       type: Date,
       required: true,
     },
     discount: {
       type: Number,
       requred: true,
     },
   },
   { timestamps: true }
 )

 const Coupon = mongoose.model('Coupon', couponSchema)

 export default Coupon