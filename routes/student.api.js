const express = require("express");
const router = express.Router();
const fs = require("fs");
const { resourceLimits } = require("worker_threads");
const sendResponse = require("../helpers/sendResponse");
/* GET students. */

const loadData = () => {
  //read part of the file
  let db = fs.readFileSync("db.json", "utf8");
  return JSON.parse(db);
};

// router.get("/", function (req, res, next) {
//   const db = loadData();
//   return sendResponse(200, db, "Student list", res, next);
// });

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

/* GET students with page and limit. */
router.get("/", function (req, res, next) {
  const page = req.query.page;
  const limit = req.query.limit;
  let studentList = {};
  let message = {};
  const db = loadData();
  try {
    let startIndex;
    let endIndex;
    if (page * limit <= db.length) {
      startIndex = (page - 1) * limit;
      endIndex = page * limit;
      message = `Get student list by page ${page} with limit of ${limit}`;
    } else if ((page - 1) * limit <= db.length) {
      startIndex = (page - 1) * limit;
      endIndex = db.length;
      message = `Get student list by page ${page} with limit of ${limit}`;
    } else if ((page - 1) * limit > db.length) {
      startIndex = db.length;
      endIndex = db.length;
      message = `Page is greater than database`;
    }

    studentList = db.slice(startIndex, endIndex);
  } catch (error) {
    console.log(error);
  }

  return sendResponse(200, studentList || {}, message, res, next);
});

router.post("/add", function (req, res, next) {
  let db = loadData();
  const body = req.body;
  let message = "";
  let index;
  try {
    index = db.map((e) => e.email).indexOf(body.email);
    // message = `${index}`;
    if (index !== -1) {
      message = `${index} Username is existed`;
    } else {
      message = `${index} add student`;
      db = db.push(body);
      db = JSON.stringify(db);
      fs.writeFile("./db.json", db, (err) => {});
    }
  } catch (error) {
    console.log(error);
  }

  return sendResponse(200, db, message, res, next);
});
module.exports = router;
