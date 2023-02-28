const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const User = require("../Models/usersModels");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtTokens");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  


  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is id",
      url: "profilepictureUrl",
    },
  });
  const token = user.getJWTToken();

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new errorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new errorHandler("Invalid email or password", 401));
  }
  const token = user.getJWTToken();

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
