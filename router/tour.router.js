const express = require("express");
const router = express.Router();
const tourController = require("../controller/tour.controller");
const userController = require("../controller/user.controller");
const reviewRouter = require("./review.router");
const imageRouter = require("./image.router");
router.use("/tours/:id/reviews", reviewRouter);
router.use("/tours/:id/image", imageRouter);

router.post("/tour", tourController.createTour);
router.get("/tours", tourController.getTour);
router.get("/tours/tour-stats", tourController.getTourStats);
router.get("/tours/monthly-plan/:monthly", tourController.getMonthlyPlan);
router.delete(
  "/tour/:id",
  userController.protect,
  userController.restrictTo("admin"),
  tourController.deleteTour
);
router.patch(
  "/tour/:id",
  userController.protect,
  userController.restrictTo("admin"),
  tourController.updateTour
);
module.exports = router;
