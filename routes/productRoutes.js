const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.post("/addproduct", addProduct);
router.get("/getproducts", getProducts);
router.put("/updateproduct", updateProduct);
router.delete("/deleteproduct/:id", deleteProduct);

module.exports = router;
