const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema(
  {
    slideImage: {
      type: String,
    },
    firstShow: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const carouselModel = mongoose.model("carousels", carouselSchema);
module.exports = carouselModel;
