const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");

const addColor = asyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);

    if (!newColor) {
      return res.status(401).json({ message: "error in Color creation" });
    }

    res.status(200).json({ message: "Product Color is created", newColor });
  } catch (error) {
    throw new Error(error);
  }
});

const getColors = asyncHandler(async (req, res) => {
  try {
    const colorList = await Color.find({});

    if (!colorList) {
      return res
        .status(401)
        .json({ message: "error in Get Product Color list" });
    }

    res.status(200).json(colorList);
  } catch (error) {
    throw new Error(error);
  }
});

const updateColor = asyncHandler(async (req, res) => {
  const { color, id } = req.body;

  try {
    const updatedColor = await Color.findByIdAndUpdate(
      id,
      {
        color: req.body.color,
      },
      { new: true }
    );

    if (!updatedColor) {
      return res.status(401).json({ message: "error in Delete Product Color" });
    }

    res.status(200).json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteColor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedColor = await Color.findByIdAndDelete(id);

    if (!deletedColor) {
      return res.status(401).json({ message: "error in Delete Product Color" });
    }

    res.status(200).json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  addColor,
  getColors,
  deleteColor,
  updateColor,
};
