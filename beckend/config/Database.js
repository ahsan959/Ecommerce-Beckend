const mongoose = require("mongoose");

const ConnectDatabase = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Ecommerce", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Connected to mongodb:${data.connection.host}`);
    });
};

module.exports = ConnectDatabase;
