'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tour,User,Review}) {
        Tour.hasMany(Review, { foreignKey: "tour_id" });
        Review.belongsTo(Tour,{foreignKey:'tour_id'});
        User.hasMany(Review,{foreignKey:'user_id'});
        Review.belongsTo(User,{foreignKey:'user_id'})
    }
    
  };
  
  
  Review.init(
    {
      review: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "phai co gia tri",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 5,
          min: 1,
        },
      },
      tour_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Review",
      
    }
  );
    
  Review.calcAverageRatings = async function (Model,tour_id) {
    const tour = await this.findAll({
      
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "numRatings"],
        [sequelize.fn("COUNT", sequelize.col("tour_id")), "count"],
      ],
      group:["tour_id"],
      where:{
        tour_id:tour_id
      }


    });
    return tour;
    //console.log(tour.dataValues);
  };
  return Review;
};
