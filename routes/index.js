const express = require("express");
const fs = require("fs");
const sendResponse = require("../helpers/sendResponse.js");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return sendResponse({}, "home", res, next);
});

router.post("/", function (req, res, next) {
  return sendResponse({}, "post", res, next);
});

router.put("/", function (req, res, next) {
  return sendResponse({}, "put", res, next);
});

router.delete("/", function (req, res, next) {
  return sendResponse({}, "delete", res, next);
});

router.post("/reqdemo", function (req, res, next) {
  const params = req.params;
  const query = req.query;
  const body = req.body;
  return sendResponse({ params, query, body }, "request demo", res, next);
});

router.post("/reqdemo/:xxx", function (req, res, next) {
  const params = req.params;
  const query = req.query;
  const body = req.body;
  return sendResponse({ params, query, body }, "request demo", res, next);
});

const studentRoutes = require("./student.api.js");
router.use("/students", studentRoutes);

// const userRoutes = require("./user.api.js");
// router.use("/users", userRoutes);

module.exports = router;
