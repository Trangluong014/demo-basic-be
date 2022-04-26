require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/school")
  .then(() => console.log("Mongoose 27017 connected"))
  .catch((err) => console.log(err));

app.use("/api", indexRouter);

app.use((req, res, next) => {
  const error = new Error("Path not found");
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log("ERROR", err.message);
  return res.status(err.statusCode).send(err.message);
});

module.exports = app;
