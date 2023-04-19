const fs = require("fs");

const categoriesFolder = "./public/uploads/categories";
const carouselFolder = "./public/uploads/carousels";
const productsFolder = "./public/uploads/products";

const CreateAllFolder = () => {
  if (!fs.existsSync(categoriesFolder)) {
    fs.mkdirSync(categoriesFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(carouselFolder)) {
    fs.mkdirSync(carouselFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(productsFolder)) {
    fs.mkdirSync(productsFolder, {
      recursive: true,
    });
  }
};

module.exports = CreateAllFolder;
