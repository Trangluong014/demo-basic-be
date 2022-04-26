const express = require("express");
const { sendResponse } = require("../helpers/utils");

const router = express.Router();

/* GET home page. */

router.get("/", function (req, res, next) {
  return sendResponse(200, {}, "haha", res, next);
});
router.put("/", function (req, res, next) {
  return sendResponse(200, {}, "haha", res, next);
});
router.delete("/", function (req, res, next) {
  return sendResponse(200, {}, "haha", res, next);
});
router.post("/", function (req, res, next) {
  return sendResponse(200, {}, "huhuhuhuhu", res, next);
});

router.post("/reqdemo", function (req, res, next) {
  const params = req.params;
  const query = req.query;
  const body = req.body;
  return sendResponse(200, { params, query, body }, "request demo", res, next);
});

const studentRoutes = require("./student.api.js");
router.use("/students", studentRoutes);

const userRoutes = require("./user.api.js");
router.use("/users", userRoutes);

module.exports = router;
