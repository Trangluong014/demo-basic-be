const express = require("express");
const router = express.Router();
const fs = require("fs");
const sendResponse = require("../helpers/sendResponse");
/* GET students. */

const loadData = () => {
  let db = fs.readFileSync("db.json", "utf8");
  return JSON.parse(db);
};

router.get("/", function (req, res, next) {
  const db = loadData();
  return sendResponse(200, db, "Student list", res, next);
});

router.post("/", function (req, res, next) {
  // const db = loadData();
  return sendResponse(200, {}, "testing post", res, next);
});

/* GET students. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  //tim x trong array
  let message = `Get single student by id ${id}`;
  let selectedStudent;
  try {
    const db = loadData();
    selectedStudent = db.find((student) => student.id === id);
    if (!selectedStudent) {
      message = "Student with given id is not found";
    }
  } catch (error) {
    console.log(error);
  }
  return sendResponse(200, selectedStudent || {}, message, res, next);
});

module.exports = router;
