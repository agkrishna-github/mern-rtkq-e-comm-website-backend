const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");

const addProductBrand = asyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);

    if (!newBrand) {
      return res.status(401).json({ message: "error in Brand creation" });
    }

    res.status(200).json({ message: "Product Brand is created", newBrand });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductBrands = asyncHandler(async (req, res) => {
  try {
    const brandList = await Brand.find({});

    if (!brandList) {
      return res
        .status(401)
        .json({ message: "error in Get Product Brand list" });
    }

    res.status(200).json(brandList);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductBrand = asyncHandler(async (req, res) => {
  const { brand, id } = req.body;

  try {
    const updateBrand = await Brand.findByIdAndUpdate(
      id,
      {
        brand: req.body.brand,
      },
      { new: true }
    );

    if (!updateBrand) {
      return res.status(401).json({ message: "error in Delete Product Brand" });
    }

    res.status(200).json(updateBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);

    if (!deletedBrand) {
      return res.status(401).json({ message: "error in Delete Product Brand" });
    }

    res.status(200).json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addProductBrand,
  getProductBrands,
  deleteProductBrand,

  updateProductBrand,
};
