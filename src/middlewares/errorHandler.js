const { errorResponse } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  console.error("error handler", err);
  const message = process.env.NODE_ENV == "production" ? "" : err.message;
  const error = process.env.NODE_ENV == "production" ? "" : err;

  errorResponse({
    res,
    message: message,
    statusCode: err.statusCode,
    error: error,
  });
};

module.exports = errorHandler;
