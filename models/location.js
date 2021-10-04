'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Location , Tour}) {
        Tour.hasMany(Location,{foreignKey:'tour_id'});
    }
  };
  Location.init(
    {
      day: DataTypes.INTEGER,
      type: {
        type: DataTypes.STRING,
        defaultValue: "Point",
      },
      coordinates: DataTypes.STRING,
      startDates: DataTypes.DATE,
      description:DataTypes.STRING,

    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};