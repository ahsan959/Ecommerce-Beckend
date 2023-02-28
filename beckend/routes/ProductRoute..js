const express = require("express");

const {
  getAllProducts,
  createProduct,
  UpdateProducts,
  deleteProduct,
  getProductDetails,
} = require("../Controllers/ProductController");
const { isAuthenticatedUser, AuthRoles } = require("../middleware/auth");

const router = express.Router();

// router.route("/product").get(isAuthenticatedUser, getAllProducts);

router.route("/product").get(AuthRoles("admin"), getAllProducts);
router.route("/product/new").post(createProduct);

router.route("/product/:id").put(UpdateProducts);
router.route("/product/:id").delete(deleteProduct);
// getProductDetails
router.route("/product/:id").get(getProductDetails);
module.exports = router;
