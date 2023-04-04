const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const userRoutes = require("./routes/user.routes");
const { successResponse, errorResponse } = require("./utils/apiResponse");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "../", "public")));

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Server running... ");
});

//not exit route handler
app.use("*", (req, res) => {
  console.log("route not exist!");
  errorResponse({
    res,
    message: "Page not exist!",
    statusCode: 401,
    error: "Not found",
  });
});

//error handler
app.use(errorHandler);

module.exports = app;
