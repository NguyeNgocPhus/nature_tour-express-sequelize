'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tourId:{
        type:DataTypes.INTEGER,
        references:{
          model:'Tours',
          key:'id'
        }
      }
      ,
      day: DataTypes.INTEGER,
      type: {
        type: DataTypes.STRING,
        defaultValue: "Point",
      },
      coordinates: DataTypes.STRING,
      startDates: DataTypes.DATE,
      description: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("Locations");
  },
};