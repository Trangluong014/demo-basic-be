const { throwException, sendResponse } = require("../helpers/utils");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const mongoose = require("mongoose");

const userController = {};
userController.createUserByEmailPassword = async (req, res, next) => {
  let { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throwException("Create error: Missing info", 400);
    }
    const found = await User.findOne({ email });
    if (found) {
      if (found.isDeleted === true) {
        throwException(
          "Account has been deleted, do you want to recover it?",
          400
        );
      }
      throwException("User email already register", 400);
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const success = await User.create({ name, email, password });
    return sendResponse(200, success, "Create User", res, next);
  } catch (error) {
    next(error);
  }
};

userController.loginWithEmailPassword = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    if (!email || !password) {
      throwException("Create error: Missing info", 400);
    }
    const found = await User.findOne({ email });
    if (!found) {
      throwException("User email has not been register", 400);
    }

    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) {
      throwException("Incorrect password", 400);
    }
    const accessToken = found.generateAccessToken();
    console.log("token", accessToken);

    sendResponse(200, accessToken, "Login sucessful", res, next);
  } catch (error) {
    next(error);
  }
};

userController.getListOfAllUser = async (req, res, next) => {
  //limit, pagination
  //total data length
  //sorting, order
  //searching, filter

  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = limit * (page - 1);
  try {
    const count = await User.countDocuments({ isDeleted: false });
    const usersList = await User.find({ isDeleted: False })
      .skip(offset)
      .limit(limit);
    const totalPage = Math.ceil(count / limit);

    sendResponse(
      200,
      {
        usersList,
        amount: usersList.length,
        total: count,
        totalPage: totalPage,
      },
      "List of all User",
      res,
      next
    );
  } catch (error) {
    next(error);
  }
};

userController.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const selectedUser = await User.findOne({ _id: id, isDeleted: true });
    if (!selectedUser) {
      throwException("User ID not found", 400);
    }
    sendResponse(200, selectedUser, `User by id: ${id}`, res, next);
  } catch (error) {}
};

userController.updateOwnName = async (req, res, next) => {
  const { newName } = req.body;
  const id = req.userId;
  console.log(newName);
  console.log(id);
  try {
    if (!newName) {
      throwException("Missing infor", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwException("User ID not found", 400);
    }

    let updateUser = await User.findByIdAndUpdate(
      id,
      { name: newName },
      { new: true, upsert: true }
    );
    sendResponse(
      200,
      updateUser,
      `Update name ${newName} for user id ${id}`,
      res,
      next
    );
  } catch (error) {
    next(error);
  }
};

userController.deleteOwnAccount = async (req, res, next) => {
  const id = req.userId;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwException("User ID not found", 400);
    }
    deleteUser = await User.findByIdAndUpdate(id, { isDeleted: true });
    sendResponse(200, deleteUser, `Delete user with id ${id}`, res, next);
  } catch (error) {
    next(error);
  }
};

userController.deleteWithId = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throwException("User ID not found", 400);
    }
    deleteUser = await User.findByIdAndUpdate(id, { isDeleted: true });
    sendResponse(200, deleteUser, `Delete user with id ${id}`, res, next);
  } catch (error) {
    next(error);
  }
};
module.exports = userController;
