const express = require("express");
const router = express.Router();
const fs = require("fs");
const { resourceLimits } = require("worker_threads");
const {
  sendResponse,
  generateRandomHexString,
} = require("../helpers/sendResponse");
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
  let message = "";
  let index;
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
      const error = new Error("Missing infor");
      error.statusCode = 400;
      throw error;
    }
    {
      const db = loadData();
      index = db.map((e) => e.email).indexOf(email);
      if (index !== -1) {
        const error = new Error("User is already existed");
        error.statusCode = 400;
        throw error;
      } else {
        message = `${index} add student`;
        const studentObj = {
          id: generateRandomHexString(24),
          name,
          email,
          password,
          __v: 0,
          age: parseInt(age),
        };
        newDb = [...db, studentObj];
        addDb = JSON.stringify(newDb);
        fs.writeFile("./db.json", addDb, (err) => {});
        return sendResponse(200, {}, message, res, next);
      }
    }
  } catch (error) {
    next(error);
  }
});

router.put("/", function (req, res, next) {
  try {
    const { email, password, newPassword } = req.body;
    if (!email || !password || !newPassword) {
      const error = new Error("Missing infor put");
      error.statusCode = 400;
      throw error;
    }
    {
      if (password === newPassword) {
        const error = new Error(
          "New password is the same with current password. Please change "
        );
        error.statusCode = 400;
        throw error;
      }
      {
        let db = loadData();
        index = db.map((e) => e.email).indexOf(email);
        if (index === -1) {
          const error = new Error("User not found");
          error.statusCode = 400;
          throw error;
        }
        {
          if (db[index].password !== password) {
            const error = new Error("Password is not match");
            error.statusCode = 400;
            throw error;
          } else {
            message = `${index} change password`;
            db[index].password = newPassword;
            let addData = JSON.stringify(db);
            fs.writeFile("./db.json", addData, (err) => {});
            return sendResponse(200, {}, message, res, next);
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/", function (req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("Missing infor delete");
      error.statusCode = 400;
      throw error;
    }
    {
      let db = loadData();
      index = db.map((e) => e.email).indexOf(email);
      if (index === -1) {
        const error = new Error("User not found");
        error.statusCode = 400;
        throw error;
      }
      {
        if (db[index].password !== password) {
          const error = new Error("Password is not match");
          error.statusCode = 400;
          throw error;
        } else {
          message = `${index} delete`;
          db.splice(index, 1);
          const addData = JSON.stringify(db);
          fs.writeFile("./db2.json", addData, (err) => {});
          return sendResponse(200, {}, message, res, next);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
