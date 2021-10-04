const { Location } = require("../models/index");

module.exports.createLocation = async (req, res, next) => {
  try {
    req.body.tour_id = req.params.tour_id;
    console.log(req.body.tour_id);
    const location = await Location.create(req.body);
    res.status(200).json(location);
  } catch (error) {
    res.send(error.message);
  }
};
