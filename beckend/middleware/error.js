const ErrorHandler = require("../utils/errorHandler.js");
module.exports = (err, req, res, next) => {
  // agar pahla wali Condition Theak hoti theak warna Second Wali Execute Kar do
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //   Wrong Mongo db id Error
  if (err.name === "CastError") {
    const message = `Invalid: Resource Not Found:${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
