const fs = require("fs");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const carouselModel = require("../models/carousels");

class Carousel {
  async getImages(req, res) {
    try {
      let Images = await carouselModel.find({});
      if (Images) {
        return res.json({ Images });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uploadSlideImage(req, res) {
    let image = req.file.filename;
    if (!image) {
      return res.json({ error: "All field required" });
    }
    try {
      let newCarousel = new carouselModel({
        slideImage: image,
      });
      let save = await newCarousel.save();
      if (save) {
        return res.json({ success: "Image upload successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSlideImage(req, res) {
    let { id } = req.body;
    if (!id) {
      return res.json({ error: "All field required" });
    } else {
      try {
        let deletedSlideImage = await carouselModel.findById(id);
        const filePath = `../jumpstart-backend/public/uploads/carousels/${deletedSlideImage.slideImage}`;

        let deleteImage = await carouselModel.findByIdAndDelete(id);
        if (deleteImage) {
          // Delete Image from uploads -> carousel folder
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Image deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getAllData(req, res) {
    try {
      let Categories = await categoryModel.find({}).count();
      let Products = await productModel.find({}).count();
      let Orders = await orderModel.find({}).count();
      let Users = await userModel.find({}).count();
      if (Categories && Products && Orders) {
        return res.json({ Categories, Products, Orders, Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const carouselController = new Carousel();
module.exports = carouselController;
