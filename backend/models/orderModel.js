import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        // qty1: { type: Number, required: true },
        // qty2: { type: Number, required: true },
        // qty3: { type: Number, required: true },
        // qty4: { type: Number, required: true },
        // qty5: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        specialPrice: {type: Number},
        countInStock: { type: Number, required: true },
        countSmall: { type: Number, default: 0 },
        countMedium: { type: Number, default: 0 },
        countLarge: { type: Number, default: 0 },
        countXlarge: { type: Number, default: 0 },
        countXXlarge: { type: Number, default: 0 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    feePrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    cdnURL: {
      type:String,
    },
    emailNotifier: {
      type: String,
    },
    couponCode: {
      type: String,
    },
    orderStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order