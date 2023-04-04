const successResponse = ({ res, message, statusCode, success, data }) => {
  statusCode = statusCode || 200;
  message = message || "Success";
  success = success || true;
  data = data || {};
  res.status(statusCode).json({ message, success, data });
};
const errorResponse = ({ res, message, statusCode, success, error }) => {
  statusCode = statusCode || 500;
  message = message || "Something went wrong!";
  success = success || false;
  error = error.stack || "Internal Server error!";

  // if (error instanceof ValidationError) {
  //   statusCode = 400;
  // }
  //   console.log("error", error.stack);
  res.status(statusCode).json({ message, success, error });
};

module.exports = {
  successResponse,
  errorResponse,
};
