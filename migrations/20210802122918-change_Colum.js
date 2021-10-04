'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.changeColumn("Locations", "coordinates", {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
