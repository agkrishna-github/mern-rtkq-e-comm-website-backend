const express = require("express");
const router = express.Router();
const {
  addProductFeature,
  getProductFeatures,
  deleteProductFeature,

  updateProductFeature,
} = require("../controllers/featureController");

router.post("/addfeature", addProductFeature);
router.get("/getfeatures", getProductFeatures);
router.put("/updatefeature", updateProductFeature);
router.delete("/deletefeature/:id", deleteProductFeature);

module.exports = router;
