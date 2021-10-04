'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Tours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        trim: true,
        allowNull: false,
      },
      slug: DataTypes.STRING,
      duration: {
        type: DataTypes.INTEGER,
        allowNull: [false, "A tour must have a duration"],
      },
      maxGroupSize: {
        type: DataTypes.INTEGER,
        allowNull: [false, "A tour must have a group size"],
      },
      difficulty: {
        type: DataTypes.ENUM,
        allowNull: [false, "A tour must have a difficulty"],
        values: ["easy", "medium", "difficult"],
      },
      ratingsAverage: {
        type: DataTypes.INTEGER,
        defaultValue: 4.5,
      },
      ratingsQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: [false, "A tour must have a price"],
      },
      priceDiscount: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable("Tours");
  },
};