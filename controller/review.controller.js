const { Tour, Location,Review ,sequelize } = require("../models/index");

const apiFeatures = require("../utils/apiFeatures");
const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const HandelFactory = require("./handleFactory");
module.exports.setTourUserIds= async(req,res,next)=>{
    if(!req.body.tour_id) req.body.tour_id = req.params.id;
    if(!req.body.user_id) req.body.user_id = req.user.id;
  //  console.log(req.body);
    next();
}

module.exports.createReview = async function (req,res,next){
    try {
        const data = await Review.create(req.body);
        const a =await Review.calcAverageRatings(Tour,data.tour_id);
     
        const tourUpdate = await Tour.update(
          {
            ratingsAverage: a[0].dataValues.numRatings,
            ratingsQuantity: a[0].dataValues.count,
          },
          {
            where: {
              id: data.tour_id,
            },
          }
        );

        res.send(a);

    } catch (error) {
        res.send(error.message)
    }
    
}

module.exports.getReview = HandelFactory.getAll(Review);
module.exports.deleteReview = HandelFactory.deleteOne(Review);

