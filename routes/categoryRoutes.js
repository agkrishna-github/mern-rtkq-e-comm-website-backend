const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

router.post("/addcategory", addCategory);
router.get("/getcategories", getCategories);
router.put("/updatecategory", updateCategory);
router.delete("/deletecategory/:id", deleteCategory);

module.exports = router;
