'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PattaHolder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PattaHolder.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,   // THIS makes the email unique
      validate: {
        isEmail: true // ensures it's a valid email format
      }
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    claimedArea: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    officerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PattaHolder',
  });
  return PattaHolder;
};