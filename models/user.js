'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Tour }) {
      Tour.hasMany(User, { foreignKey: "tour_id" });
      User.belongsTo(Tour, { foreignKey: "tour_id" });
    }
  };
  User.init(
    {
      tour_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 12);
        },
      },
      
    },
    
  );
  User.prototype.correctPassword = function (password, currenPassword) {
    return  bcrypt.compare(password, currenPassword);
  };
      
 
  
  return User;
};