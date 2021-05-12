import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  deleteOrder
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { reduceCountInStock } from '../middleware/productMiddleware.js'

router.route('/').post(protect, reduceCountInStock, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById).delete(protect, admin, deleteOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/orderstatus').put(protect, admin, updateOrderStatus)

export default router
