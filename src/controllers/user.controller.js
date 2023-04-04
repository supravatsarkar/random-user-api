const { successResponse, errorResponse } = require("../utils/apiResponse");
const db = require("./../db/");
const path = require("path");
const userDir = path.join(__dirname, "..", "db", ".data", "users");

const saveUser = async (req, res, next) => {
  const { body } = req;
  console.log("body", body);
  const saveUser = await db.writeData(userDir, body);
  successResponse({ res, data: JSON.parse(saveUser) });
};
const deleteUser = async (req, res, next) => {
  try {
    const { body } = req;
    console.log("body", body);
    const deleteUser = await db.removeFile(userDir, `${body._id}.json`);
    return successResponse({ res, data: deleteUser });
  } catch (error) {
    console.log("run this");
    return errorResponse({
      res,
      message: "User not exit or Server error",
      statusCode: 401,
      error: new Error("User not exit or Server error"),
    });
  }
};
const getRandomUser = async (req, res, next) => {
  console.log("userDir=>", userDir);
  const userList = await db.readDir(userDir);
  console.log("userList", userList);
  let user = {};
  if (userList.length) {
    const selectedUser = Math.floor(Math.random() * userList.length);
    const fileName = userList[selectedUser];
    console.log("fileName", fileName);
    user = await db.readSingleFile(path.join(userDir, fileName));
  }

  // const randomUser = await db.readSingleFile(userDir);

  successResponse({ res, data: user });
};

const getAllUser = async (req, res, next) => {
  console.log("userDir=>", userDir);
  const skip = req.query.skip ? Number(req.query.skip) : undefined;
  const limit = req.query.limit ? Number(req.query.limit) : undefined;
  const userList = await db.readFiles(userDir, skip, limit);
  const finalResponse = {
    users: userList.data,
    totalLength: userList.totalLength,
  };

  successResponse({ res, data: finalResponse });
};

const updateUser = async (req, res, next) => {
  console.log("userDir=>", userDir);
  const { body } = req;
  console.log("req.body=>", body);
  const fileDir = `${userDir}/${body._id}.json`;
  const user = await db.readSingleFile(fileDir);
  console.log(user);
  if (!user) {
    return errorResponse({
      res,
      message: "User does not exit!",
      statusCode: 401,
      error: new Error("User does not exit!"),
    });
  }
  body.name ? (user.name = body.name) : 0;
  body.contact ? (user.contact = body.contact) : 0;
  body.address ? (user.address = body.address) : 0;
  body.photoUrl ? (user.photoUrl = body.photoUrl) : 0;
  const saveUser = await db.updateFile(fileDir, user);
  if (req.isInternalCall) {
    return saveUser;
  }

  return successResponse({ res, data: saveUser });
};

const bulkUpdate = async (req, res, next) => {
  console.log("bulkUpdate", req.body);
  const updatingUserList = req.body;
  const userList = await db.readDir(userDir);
  let users = { isUserNotExit: false };
  updatingUserList.forEach((user) => {
    const isUserExist =
      userList.indexOf(`${user._id}.json`) != -1 ? true : false;
    console.log("res.headersSent", res.headersSent);
    console.log("isUserExist", isUserExist);
    if (!isUserExist) {
      users.isUserNotExit = true;
      users._id = user._id;
    }
  });
  if (users.isUserNotExit) {
    console.log("run if user not exit");
    return errorResponse({
      res,
      message: `${users._id} id not exist!`,
      error: new Error("User not exist!"),
    });
  }
  console.log("run this");

  const updatedUser = [];

  updatingUserList.forEach(async (user) => {
    // console.log("user length", Object.keys(user).length);

    if (Object.keys(user).length > 1) {
      req.isInternalCall = true;
      req.body = user;
      const result = await updateUser(req, res);
      updatedUser.push(result);
    }
  });

  return successResponse({ res, data: updatedUser });
};

module.exports = {
  saveUser,
  getRandomUser,
  getAllUser,
  updateUser,
  bulkUpdate,
  deleteUser,
};
