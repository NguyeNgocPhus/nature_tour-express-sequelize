const express = require("express");
const router = express.Router({mergeParams:true});
const imageController = require("../controller/imageController");


router.post(
  "/",
  imageController.setTourIds,
  imageController.createImage
);

module.exports = router;
