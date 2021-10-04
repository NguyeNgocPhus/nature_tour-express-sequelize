'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Tour,User,Images}) {
      Tour.hasMany(Images,{foreignKey:"tour_id"});
      Images.belongsTo(Tour,{foreignKey:"tour_id"});

    }
  };
  Images.init(
    {
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tour_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Images;
};