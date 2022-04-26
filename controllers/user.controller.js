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
  try {
    const studentList = await User.find();
    sendResponse(200, studentList, "List of all User", res, next);
  } catch (error) {
    next(error);
  }
};

userController.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const selectedUser = await User.findById(id);
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
    deleteUser = await User.findByIdAndDelete(id);
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
    deleteUser = await User.findByIdAndDelete(id);
    sendResponse(200, deleteUser, `Delete user with id ${id}`, res, next);
  } catch (error) {
    next(error);
  }
};
module.exports = userController;
