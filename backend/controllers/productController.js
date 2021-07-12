import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const brandKeyword = req.query.keyword
    ? {
        brand: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const categoryKeyword = req.query.keyword
    ? {
        category: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({
    $or: [{ ...keyword }, { ...brandKeyword }, { ...categoryKeyword }],
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort([["createdAt", -1]]);

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//GET PRODUCT BY CATEGORY

const getProductsByCategory = asyncHandler(async (req, res) => {
  const product = await Product.find({ category: req.params.category });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//GET PRODUCT BY BRAND

const getProductsByBrand = asyncHandler(async (req, res) => {
  const product = await Product.find({ brand: req.params.brand });
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Product",
    price: 0.0,
    specialPrice: 0.0,
    lastPrice: 0.0,
    user: req.user._id,
    image: "https://i.ibb.co/5cwCHky/FY3017-2.jpg",
    additionalimageone: "",
    additionalimagetwo: "",
    additionalimagethree: "",
    brand: "Creative Duo",
    category: "",
    countInStock: 10,
    numReviews: 0,
    description: "Description Currently Not Available",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    specialPrice,
    lastPrice,
    additionalimageone,
    additionalimagetwo,
    additionalimagethree,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.specialPrice = specialPrice;
    product.lastPrice = lastPrice;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.additionalimageone = additionalimageone;
    product.additionalimagetwo = additionalimagetwo;
    product.additionalimagethree = additionalimagethree;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const deleteProductReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    /// removing the specific review
    product.reviews = product.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );

    // This bottom part deletes the bug for the number of reviews made. 
    product.numReviews = product.numReviews - 1

    product.rating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length
        : 0;

    await product.save();
    res.status(201).json({ message: "Review deleted" });
  } else {
    res.status(404);
    throw new Error("Review not Deleted");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public

// GET TOP RATED PRODUCTS

const getTopProducts = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const products = await Product.find({}).sort({ rating: -1 }).limit(8);
  res.json(products);
});

const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(4);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  deleteProductReview,
  getTopProducts,
  getLatestProducts,
  getProductsByBrand,
  getProductsByCategory,
};
