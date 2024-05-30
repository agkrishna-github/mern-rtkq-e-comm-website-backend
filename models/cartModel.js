const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qty: {
    type: Number,
    require: true,
  },
  pcolor: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
