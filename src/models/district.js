'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      District.belongsTo(models.State, {
        foreignKey: 'stateId',
        as: 'state'
      });

      // One district has many users
      District.hasMany(models.User, {
        foreignKey: 'districtId',
        as: 'users'
      });

    }
  }
  District.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'States',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'District',
    tableName: 'Districts',
    timestamps: true,
  });
  return District;
};