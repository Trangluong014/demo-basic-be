const sendResponse = (data, message, res, next) => {
  const result = { data, message };
  return res.status(200).send(result);
};

module.exports = sendResponse;
