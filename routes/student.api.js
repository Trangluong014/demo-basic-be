const data = {};
const express = require("express");
const router = express.Router();

/* GET students. */
router.get("/", function (req, res, next) {
  // const queries = req.query;
  // console.log(queries);
  // test error
  // try {
  //   const x = 3;
  //   x.map((e) => e);
  //   return res.status(200).send({ data });
  // } catch (error) {
  //   next(error);
  // }

  return res.status(200).send("students");
});

/* GET students. */
const db = { data: ["tuan", "trung", "thanh", "thuy"] };
router.get("/", function (req, res, next) {
  // const params = req.params;
  // console.log(params);
  return res.status(200).send(db);
});

/* GET students. */
router.get("/:number", function (req, res, next) {
  const number = req.params;
  const select = db.data[number];
  // const params = req.params;
  // console.log(params);
  return res.status(200).send({ data: select });
});

module.exports = router;
