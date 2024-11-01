const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./app/middleware/globalErrorHandler");
const routes = require("./app/routes");
const NotFoundHandler = require("./error/NotFoundHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: [],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/", routes);

app.get("/", async (req, res) => {
  res.json("Welcome to Car Rental");
});

app.use(globalErrorHandler);
app.use(NotFoundHandler.handle);

module.exports = app;
