const express = require("express");
const router = express.Router();
const carouselController = require("../controller/carousels");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/carousels");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get-slide-image", carouselController.getImages);
router.post("/delete-slide-image", carouselController.deleteSlideImage);
router.post(
  "/upload-slide-image",
  upload.single("image"),
  carouselController.uploadSlideImage
);
router.post("/dashboard-data", carouselController.getAllData);

module.exports = router;
