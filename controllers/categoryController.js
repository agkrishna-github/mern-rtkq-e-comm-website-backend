const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

const addCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    if (!newCategory) {
      return res.status(401).json({ message: "error in Category creation" });
    }

    res
      .status(200)
      .json({ message: "Product Category is created", newCategory });
  } catch (error) {
    throw new Error(error);
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categoryList = await Category.find({});

    if (!categoryList) {
      return res
        .status(401)
        .json({ message: "error in Get Product Category list" });
    }

    res.status(200).json(categoryList);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { category, id } = req.body;

  try {
    const updateCategory = await Category.findByIdAndUpdate(
      id,
      {
        category: req.body.category,
      },
      { new: true }
    );

    if (!updateCategory) {
      return res
        .status(401)
        .json({ message: "error in Delete Product Category" });
    }

    res.status(200).json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(401)
        .json({ message: "error in Delete Product Category" });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};
