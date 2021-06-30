import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    orderNotes,
    itemsPrice,
    specialPrice,
    lastPrice,
    couponCode,
    feePrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      orderNotes,
      itemsPrice,
      specialPrice,
      lastPrice,
      shippingAddress,
      couponCode,
      feePrice,
      totalPrice,
    });

    // const orderDetails = asyncHandler(async (req, res) => {
    //   let { orderItems, email, shippingAddress, totalPrice } = req.body;
    //   //send email to regitering user
    //   var mailgun = new Mailgun({
    //     apiKey: process.env.MailGunAPI,
    //     domain: process.env.MailGunDomain,
    //   });
    //   var data = {
    //     from: "Creative Duo Shopping <creativeduo2020@gmail.com>",
    //     to: email,
    //     subject: "Order Details",

    //     html: `
    //         <h1>Your Order Details: </h1>
    //         <hr>
    //         <p>Your Order Items : <br> {order.orderItems} </p>

    //     `,
    //   };

    //   mailgun.messages().send(data, function (error, info) {
    //     if (error) {
    //       res.status(400);
    //       throw new Error(error);
    //     } else {
    //       // console.log('Email sent: ' + info.response)
    //       res.status(201).json({
    //         response: "We have sent an email with your order details",
    //       });
    //     }
    //   });
    // });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (
    order &&
    (req.user.isAdmin ||
      req.user.ispromember ||
      req.user.isMilitary || 
      req.user._id.toString() === order.user._id.toString())
  ) {
    res.json(order);
    return;
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      // email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});


//UPDATE ORDER TO PACKED
const updateOrderToPacked = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPacked = true;
    order.packedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//UPDATE ORDER TO DISPATCHED
const updateOrderToDispatched = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDispatched = true;
    order.dispatchedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//CANCEL ORDER
const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isCancelled = true;
    order.cancelledAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // //UPDATE COUNT IN STOCK
    // // ==========================================================

    // for (const index in order.orderItems) {
    //   const item = order.orderItems[index];
    //   const product = await Product.findById(item.product);
    //   product.countInStock -= item.qty;
    //   await product.save();
    // }
    // // ========================================================

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to status
// @route   GET /api/orders/:id/status
// @access  Private/Admin

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.orderStatus = "pending";
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order could not be updated or found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort([
    ["createdAt", -1],
  ]);
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name")
    .sort([["createdAt", -1]]);
  res.json(orders);
});

// @desc    Delete order
// @route   DELETE /api/order/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await order.remove();
    res.json({ message: "Order Has Been Deleted From Database" });
  } else {
    res.status(404);
    throw new Error("Order Not Found (ERROR)");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  updateOrderStatus,
  getOrders,
  deleteOrder,
  updateOrderToPacked,
  updateOrderToDispatched,
  cancelOrder,
};
