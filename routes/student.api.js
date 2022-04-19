let data = {};
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { load } = require("nodemon/lib/config");
const sendResponse = require("../helpers/sendResponse");

/* GET students. */
const loadData = () => {
  let db = fs.readFileSync("./db.json", "utf8");
  return JSON.parse(db);
};

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
  const db = loadData();

  console.log("read from db", db);
  return sendResponse(db, "Student list", res, next);
});

/* GET students. */
// const db = { data: ["tuan", "trung", "thanh", "thuy"] };
// router.get("/", function (req, res, next) {
// const params = req.params;
// console.log(params);
//   return res.status(200).send({ data: {}, message: "Student list" });
// });

/* GET students. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  // const params = req.params;
  // console.log(params);
  let message = `Get single student by id ${id}`;
  try {
    const db = loadData();
    const selectedStudent = db.find((student) => student.id === id);
    if (!selectedStudent) {
      message = "student with given id is not found";
    }
    return sendResponse(selectedStudent, message, res, next);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", function (req, res, next) {
  return sendResponse({}, "testing post", res, next);
});

module.exports = router;
