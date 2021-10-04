const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controller/review.controller");
const userController = require("../controller/user.controller");


router.get("/", reviewController.getReview);
router.post(
  "/",
  userController.protect,
  userController.restrictTo("admin"),
  reviewController.setTourUserIds,
  reviewController.createReview
);

router.delete(
  "/:id",
  userController.protect,
  userController.restrictTo("admin"),
  reviewController.deleteReview
);
module.exports = router;
