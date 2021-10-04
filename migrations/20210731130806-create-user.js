'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tour_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tours",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: "default.png",
      },
      role: {
        type: DataTypes.ENUM("user", "admin", "guide", "lead-guide"),
        defaultValue: "user",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        select: false,
      },
      passwordChangedAt: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        select: false,
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
    
      await queryInterface.dropTable('Users');

  },
};
