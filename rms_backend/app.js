const express = require("express");
const app = express();
const mongoose = require("mongoose");

const userRoute = require("./routes/users");
const menuRoute = require("./routes/menuAdd");
const tableRoute = require("./routes/tableAdd");
const orderRoute = require("./routes/order");
const resRoute = require("./routes/restaurantAdd")
const cors = require("cors");
const dns = require("dns");
const fileUpload = require("express-fileupload");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config()

const connDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected...");
  } catch (err) {
    console.log("Connection Failed...");
  }
};
connDB();
app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  }),
);

app.use("/user", userRoute);
app.use("/menu", menuRoute);
app.use("/table",tableRoute);
app.use("/order",orderRoute);
app.use("/addname",resRoute)
module.exports = app;
