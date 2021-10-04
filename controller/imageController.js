const { Images } = require("../models/index");
const jwt = require("jsonwebtoken");
const HandelFactory = require("./handleFactory");
module.exports.setTourIds = async (req, res, next) => {
  if (!req.body.tour_id) req.body.tour_id = req.params.id;

  //  console.log(req.body);
  next();
};
module.exports.getImages = HandelFactory.getAll(Images);
module.exports.createImage = HandelFactory.createOne(Images);
module.exports.deleteImage = HandelFactory.deleteOne(Images);
