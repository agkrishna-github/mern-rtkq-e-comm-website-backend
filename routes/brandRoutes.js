const express = require("express");
const router = express.Router();
const {
  addProductBrand,
  getProductBrands,
  deleteProductBrand,

  updateProductBrand,
} = require("../controllers/brandController");

router.post("/addbrand", addProductBrand);
router.get("/getbrands", getProductBrands);
router.put("/updatebrand", updateProductBrand);
router.delete("/deletebrand/:id", deleteProductBrand);

module.exports = router;
