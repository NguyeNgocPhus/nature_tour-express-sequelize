const { Tour, Location, sequelize } = require("../models/index");
const apiFeatures = require("../utils/apiFeatures");
const db = require("../models");
const { Op, QueryTypes } = require("sequelize");
const HandelFactory = require("./handleFactory");

module.exports.getTourStats = async (req, res, next) => {
  try {
    const tour = await Tour.findAll({
      attributes: [
        "difficulty",
        [sequelize.fn("SUM", sequelize.col("ratingsQuantity")), "numRatings"],
        [sequelize.fn("AVG", sequelize.col("price")), "avgPrice"],
        [sequelize.fn("MIN", sequelize.col("price")), "minPrice"],
        [sequelize.fn("MAX", sequelize.col("price")), "maxPrice"],
        [sequelize.fn("AVG", sequelize.col("ratingsAverage")), "avgPrice"],
        [sequelize.fn("COUNT", sequelize.col("difficulty")), "total_amount"],
      ],
      group: ["difficulty"],
    });
    res.send(tour);
  } catch (error) {
    res.send(error.message);
  }
};
module.exports.getMonthlyPlan = async (req, res, next) => {
  const year = req.params.monthly;
  const data = await sequelize.query(
    `
     	select * from(SELECT DATE_PART('month',"startDates") AS Month_tour , "Locations"."tour_id" 
      FROM "Locations"
      group by  DATE_PART('month',"startDates") ,"Locations"."tour_id"
      order by Month_tour asc)  "a" inner join "Tours" on "Tours"."id" = "a"."tour_id" 
    `,
    {
      type: QueryTypes.SELECT,
    }
  );
};
module.exports.createTour = HandelFactory.createOne(Tour);

module.exports.getTour = HandelFactory.getAll(Tour);
module.exports.deleteTour = HandelFactory.deleteOne(Tour);
module.exports.updateTour = HandelFactory.uptateOne(Tour);
