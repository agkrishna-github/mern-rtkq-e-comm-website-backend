const Title = require("../models/titleModel");
const asyncHandler = require("express-async-handler");

const addproducttitle = asyncHandler(async (req, res) => {
  try {
    const newTitle = await Title.create(req.body);

    if (!newTitle) {
      return res.status(401).json({ message: "error in Title creation" });
    }

    res.status(200).json({ message: "Product Title is created", newTitle });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductTitles = asyncHandler(async (req, res) => {
  try {
    const titleList = await Title.find({});

    if (!titleList) {
      return res
        .status(401)
        .json({ message: "error in Get Product Title list" });
    }

    res.status(200).json(titleList);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductTitle = asyncHandler(async (req, res) => {
  const { title, id } = req.body;

  try {
    const updateTitle = await Title.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
      },
      { new: true }
    );

    if (!updateTitle) {
      return res.status(401).json({ message: "error in Delete Product Title" });
    }

    res.status(200).json(updateTitle);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductTitle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTitle = await Title.findByIdAndDelete(id);

    if (!deletedTitle) {
      return res.status(401).json({ message: "error in Delete Product Title" });
    }

    res.status(200).json(deletedTitle);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addproducttitle,
  getProductTitles,
  deleteProductTitle,

  updateProductTitle,
};
