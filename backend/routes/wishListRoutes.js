import express from 'express'
const router = express.Router()

import { protect } from '../middleware/authMiddleware.js'
import { getWishList } from '../controllers/wishListController.js'

router.route('/').get(getWishList).delete(protect, getWishList)

export default router