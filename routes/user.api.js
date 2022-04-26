const express = require("express");
const {
  createUserByEmailPassword,
  loginWithEmailPassword,
  getListOfAllUser,
  getUserById,
  updateOwnName,
  deleteOwnAccount,
  deleteWithId,
} = require("../controllers/user.controller");
const authentication = require("../middlewares/auth");

const router = express.Router();
const data = { a: "a" };

/**
 * @method: POST
 * @access: Public
 * @description: Create new user document in User collection
 * @constructor: req.body {Userscheme}
 */

router.post("/create", createUserByEmailPassword);

/**
 * @method: POST
 * @access: Public
 * @description: Log in a user with email and password
 * @constructor: req.body {Userschema}
 */
router.post("/login", loginWithEmailPassword);

/* Request for a list of all users */
/* GET users. */
router.get("/", getListOfAllUser);

/* Request for a user info with user id */
/* GET single users. */
router.get("/:id", getUserById);

/* Update own name after authenticated */
router.put("/update", authentication, updateOwnName);
/* Delete own account after authenticated */
router.delete("/delete", authentication, deleteOwnAccount);
/* Delete an account with correct id */
router.delete("/delete/:id", deleteWithId);
module.exports = router;
