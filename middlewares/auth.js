const { JsonWebTokenError } = require("jsonwebtoken");
const { throwException } = require("../helpers/utils");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET;

const authentication = (req, res, next) => {
  try {
    const bearerTokenString = req.headers.authorization;
    // "Bearer accessToken" because frontend will send a "Bearer accesstoken string"
    if (!bearerTokenString) {
      throwException("Login required: HeaderAccessToken not found", 401);
    }
    //get token only
    const token = bearerTokenString.replace("Bearer ", "");
    //verify token to get _id
    console.log("token", token);
    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
      if (err) {
        throwException("TokenError", 401);
      }
      //add _id to req.userId , req will carry on
      //this value to next controller
      req.userId = data._id;
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
