const express = require("express");
const router = express.Router();
const locationController = require("../controller/location.controller");
const { Location } = require("../models/index");

router.post("/:tour_id/location", locationController.createLocation);

module.exports = router;
