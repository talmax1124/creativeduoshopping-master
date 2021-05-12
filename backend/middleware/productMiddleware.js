import asyncHandler from 'express-async-handler'
 import Product from '../models/productModel.js'

 const reduceCountInStock = asyncHandler(async (req, res, next) => {
   const { orderItems } = req.body
   if (orderItems && orderItems.length === 0) {
     res.status(400)
     throw new Error('No order items')
     return
   } else {
     orderItems.map(async (item) => {
       const product = await Product.findById(item.product)
       if (product) {
         product.countInStock = product.countInStock - item.qty
        //  product.countSmall = product.countSmall - item.qty1
        //  product.countMedium = product.countMedium - item.qty2
        //  product.countLarge = product.countLarge - item.qty3
        //  product.countXlarge = product.countXlarge - item.qty4
        //  product.countXXLarge= product.countXXLarge - item.qty5
       }
       await product.save()
     })
     next()
   }
 })

 export { reduceCountInStock }