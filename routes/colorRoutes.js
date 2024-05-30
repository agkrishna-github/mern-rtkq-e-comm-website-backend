const express = require("express");
const router = express.Router();
const {
  addColor,
  getColors,
  deleteColor,
  updateColor,
} = require("../controllers/colorController");

router.post("/addcolor", addColor);
router.get("/getcolors", getColors);

router.put("/updatecolor", updateColor);
router.delete("/deletecolor/:id", deleteColor);

module.exports = router;
