const Product = require("../Models/products");
const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError.js");
const ApiFeatues = require("../utils/apiFeatures");

// Create Products (Admin)
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  req.body.user = req.user.id;

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products for Both admin and users
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCounts = await Product.countDocuments();
  // and pass into Json

  const apiFeature = new ApiFeatues(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product for (Admin)

exports.UpdateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  // Agar mil jati ha
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Products

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  // agar Product mil jati ha tu

  await product.remove();
  res.status(200).json({
    message: true,
    message: "Product Deleted Sucessfully",
  });
});

// Get Single Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errorHandler("Product Not Found", 404));
  }

  // if product Found
  res.status(200).json({
    success: true,
    product,
    productCounts,
  });
});
