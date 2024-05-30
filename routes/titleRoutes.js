const express = require("express");
const router = express.Router();
const {
  addproducttitle,
  getProductTitles,
  deleteProductTitle,

  updateProductTitle,
} = require("../controllers/titleController");

router.post("/addProductTitle", addproducttitle);
router.get("/getproducttitles", getProductTitles);

router.put("/updateproducttitle", updateProductTitle);
router.delete("/deleteproducttitle/:id", deleteProductTitle);

module.exports = router;
