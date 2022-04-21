const crypto = require("crypto");

const sendResponse = (statusCode, data, message, res, next) => {
  const result = { data, message };
  return res.status(statusCode).send(result);
};
const generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len);
  // .toUpperCase(); // return required number of characters
};

module.exports = { sendResponse, generateRandomHexString };
