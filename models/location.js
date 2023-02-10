"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MovieTheater }) {
      this.hasOne(MovieTheater, { foreignKey: "location_id", onDelete:'CASCADE', hooks:true });
    }
  }
  Location.init(
    {
      street_name: DataTypes.STRING,
      city_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
