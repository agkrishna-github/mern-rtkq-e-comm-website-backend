require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const imageRoute = require("./routes/imageRoutes");

const titleRoute = require("./routes/titleRoutes");
const brandRoute = require("./routes/brandRoutes");
const categoryRoute = require("./routes/categoryRoutes");
const colorRoute = require("./routes/colorRoutes");
const productRoute = require("./routes/productRoutes");
const featureRoute = require("./routes/featureRoutes");

connectDB();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/users", userRoute);
app.use("/image", imageRoute);

app.use("/title", titleRoute);
app.use("/brand", brandRoute);
app.use("/feature", featureRoute);
app.use("/category", categoryRoute);
app.use("/color", colorRoute);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  throw new Error("err", err);
});
