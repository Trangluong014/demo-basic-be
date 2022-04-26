const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET;

//create schema definition
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
//Add method
//❌ arrow function in object can't access to this
//✅ use normal function instead for object methods

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};
//create User model (collection)
const User = mongoose.model("Users", userSchema);

module.exports = User;
