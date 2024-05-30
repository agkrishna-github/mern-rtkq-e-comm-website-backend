const Feature = require("../models/featureModel");
const asyncHandler = require("express-async-handler");

const addProductFeature = asyncHandler(async (req, res) => {
  try {
    const newFeature = await Feature.create(req.body);

    if (!newFeature) {
      return res.status(401).json({ message: "error in Feature creation" });
    }

    res.status(200).json({ message: "Product Feature is created", newFeature });
  } catch (error) {
    throw new Error(error);
  }
});

const getProductFeatures = asyncHandler(async (req, res) => {
  try {
    const featureList = await Feature.find({});

    if (!featureList) {
      return res
        .status(401)
        .json({ message: "error in Get Product Feature list" });
    }

    res.status(200).json(featureList);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProductFeature = asyncHandler(async (req, res) => {
  const { feature, id } = req.body;

  try {
    const updateFeature = await Feature.findByIdAndUpdate(
      id,
      {
        feature: req.body.feature,
      },
      { new: true }
    );

    if (!updateFeature) {
      return res
        .status(401)
        .json({ message: "error in Delete Product Feature" });
    }

    res.status(200).json(updateFeature);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductFeature = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFeature = await Feature.findByIdAndDelete(id);

    if (!deletedFeature) {
      return res
        .status(401)
        .json({ message: "error in Delete Product Feature" });
    }

    res.status(200).json(deletedFeature);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addProductFeature,
  getProductFeatures,
  deleteProductFeature,

  updateProductFeature,
};
