/*
in upload the folder automatically create after server running like
public -> uploads -> 1.products, 2.carousel, 3. categories
*/

const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// set variable for express
const app = express();

// Import Auth middleware for check user login or not~
const { loginCheck } = require("./middleware/auth");
const CreateAllFolder = require("./configuration/scriptCreateUploadsFolder");

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

// Import Router
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const brainTreeRouter = require("./routes/braintree");
const orderRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const carouselRouter = require("./routes/carousels");

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", brainTreeRouter);
app.use("/api/order", orderRouter);
app.use("/api/carousels", carouselRouter);

// Database Connection
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully Connected to MongoDB Database wdnyana!!");
  } catch (error) {
    console.log(
      "Error connecting to MongoDB Database wdnyana. Please check Again!!",
      error
    );
  }
};
// Call connectToDB
connectToDB();

// Port Server Running
const PORT = process.env.PORT_ADDRESS || 9000;
// console.log(process.env.PORT_ADDRESS);

app.listen(PORT, () => {
  console.log("Server is Running on Port", PORT);
});

/* Create All Uploads Folder if not exists | For Uploading Images */
CreateAllFolder();

// print text
console.log("***************************");
console.log("I Hope All is Working!!! :)");
console.log("***************************");
