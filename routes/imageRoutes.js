const express = require("express");
const router = express.Router();
const { uploadPhoto } = require("../middlewares/uploadImgMiddleware");
const { uploadImages, deleteImage } = require("../controllers/imageController");

router.post("/addImages", uploadPhoto.array("images", 10), uploadImages);

router.delete("/deleteImage/:id", deleteImage);

module.exports = router;
