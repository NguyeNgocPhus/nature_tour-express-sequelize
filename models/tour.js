'use strict';
const {
  Model
} = require('sequelize');
var validator = require("validator");

module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tour.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        trim: true,
        allowNull: false,
        validate: {
          len: {
            args: [10, 40],
            msg: "sai mmmm",
          },
        },
      },
      slug: DataTypes.STRING,
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "phai co gia tri",
          },
        },
      },
      maxGroupSize: {
        type: DataTypes.INTEGER,
        allowNull: [false, "A tour must have a group size"],
      },
      difficulty: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["easy", "medium", "difficult"],
      },
      ratingsAverage: {
        type: DataTypes.FLOAT,
        defaultValue: 4.5,
        validate: {
          min: 1,
          max: 5,
        },
      },
      ratingsQuantity: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: [false, "A tour must have a price"],
      },
      priceDiscount: {
        type: DataTypes.INTEGER,
        validate: {
          customValidator(value) {
            if (value > this.price) {
              throw new Error("discount ko the lon hon price");
            }
          },
        },
      },
      summary: {
        type: DataTypes.STRING,
        trim: true,
        allowNull: [false, "A tour must have a description"],
      },
      description: {
        type: DataTypes.STRING,
        trim: true,
      },
      imageCover: {
        type: DataTypes.STRING,
        allowNull: [false, "A tour must have a cover image"],
      },
    },
    {
      sequelize,
      modelName: "Tour",
      hooks: {},
    }
  );


  return Tour;
};