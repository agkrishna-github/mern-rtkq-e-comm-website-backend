const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);

      urls.push(newpath);
    }
    const images = urls.map((file) => {
      return file;
    });

    res.status(201).json(images);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = cloudinaryDeleteImg(id, "images");

    res.status(201).json({ id, message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImage,
};
