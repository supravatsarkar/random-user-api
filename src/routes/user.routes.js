const express = require("express");
const userController = require("../controllers/user.controller");
const userValidation = require("./../validation/user.validation");

const router = express.Router();

router.get("/random", userController.getRandomUser);
router.get("/all", userController.getAllUser);
router.post("/save", userValidation.saveUser, userController.saveUser);
router.patch("/update", userValidation.updateUser, userController.updateUser);
router.patch(
  "/bulk-update",
  userValidation.bulkUpdate,
  userController.bulkUpdate
);
router.delete("/delete", userValidation.deleteUser, userController.deleteUser);

module.exports = router;
