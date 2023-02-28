const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// Route Imports
const product = require("./routes/ProductRoute.");
const user = require("./routes/UsersRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

// Middleware for To handle the Errors
app.use(errorMiddleWare);
module.exports = app;
