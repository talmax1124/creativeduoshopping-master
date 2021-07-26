import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        specialPrice: { type: Number },
        countInStock: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
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
    orderNotes: {
      type: String,
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

    isPacked: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDispatched: {
      type: Boolean,
      required: true,
      default: false,
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
      type: String,
    },
    emailNotifier: {
      type: String,
    },
    numOrders: {
      type: Number,
      default: 0,
    },
    numIncome: {
      type: Number,
      default: 0,
    },
    orderStatus: {
      type: String,
    },

    countInStock: { type: Number },

    fileUpload: {
      type: String,
    },

    packedAt: {
      type: String,
      type: Date,
    },
    emailNotifier: {
      dispatchedAt: {
        type: String,
        type: Date,
      },
    },


    isCancelled: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      cancelledAt: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
