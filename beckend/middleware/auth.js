const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/CatchAsyncError");
const jwt = require("jsonwebtoken");
const user = require("../Models/usersModels");

JWT_SECRET = `HDJASHDJHSAJDHSAKJDHSKJAHD`;

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, JWT_SECRET);

  req.user = await users.findById(decodedData.id);

  next();
});

exports.AuthRoles = (...roles) => {
  return (req, res, next) => {
    //req.user.role may user aya ga agar user ha tu Resourse Access ni ho hi
    // role=admin phir access kar sakhta ha

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
