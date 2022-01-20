import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Could we do something like:
// var reviewSchema = mongoose.Schema(
//   {
//   optionName: { type: String, required: true },
//     optionPrice: { type: Number},
// });

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    additionalimageone: {
      type: String,
    },
    additionalimagetwo: {
      type: String,
    },
    additionalimagethree: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    specialPrice: {
      type: Number,
      default: 0,
    },
    lastPrice: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    productVideo: {
      type: String,
    },
    productTutorial: {
      type: String,
    },
    specialPriceDiscountText: {
      type: Number,
    },
    productImportantInformation: {
      type: String,
    },

    productOptions: [
      {
        mainOptionTitle: {
          type: String,
        },
        subOptions: [
          {
            subOptionTitle: {
              type: String,
              default: "standard",
            },
            subOptionPrice: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],

    // width, size, color || shape, width, color
    // size: lg, sm, md
    // For each option, get price from data and + it to productPrice or Total
    // Order Model Code Line 50 =>
    // totalPrice: {
    //   type: Number,
    //   required: true,
    //   default: 0.0,
    // },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
