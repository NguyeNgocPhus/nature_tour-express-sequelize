const express = require("express");

const viewController = require("../controller/view.controller");
const router = express.Router();
const userController = require("../controller/user.controller");

router.get("/", userController.isLogin, viewController.overview);
router.get("/tour/:slug", userController.isLogin, viewController.getTour);
router.get("/login", userController.isLogin, viewController.login);
router.get("/me", userController.protect, viewController.me);
module.exports = router;
