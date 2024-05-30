const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    images: Array,
    feature: String,
    desc: String,
    brand: String,
    category: String,
    color: Array,
    price: String,
    qty: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
