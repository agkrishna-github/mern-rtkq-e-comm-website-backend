const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    feature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feature", featureSchema);
