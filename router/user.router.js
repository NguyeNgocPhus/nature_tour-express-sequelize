const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

const { User } = require("../models/index");

router.get("/users", userController.getUser);
router.post("/user", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.patch(
  "/users/UpdateMe",
  userController.protect,
  userController.updateMe
);
router.delete(
  "/users/:id",
  userController.protect,
  userController.restrictTo("admin"),
  userController.deleteUser
);
module.exports = router;
