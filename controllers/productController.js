const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const addProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    if (!newProduct) {
      return res.status(401).json({ message: "error in Product creation" });
    }

    res.status(200).json({ message: "Product is created", newProduct });
  } catch (error) {
    throw new Error(error);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const productList = await Product.find({});

    if (!productList) {
      return res.status(401).json({ message: "error in Get Product list" });
    }

    res.status(201).json(productList);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { title, images, feature, brand, category, color, price, qty, id } =
    req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        images,
        feature,

        brand,
        category,
        color,
        price,
        qty,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(401).json({ message: "error in Update Product" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(401).json({ message: "error in Delete Product" });
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
