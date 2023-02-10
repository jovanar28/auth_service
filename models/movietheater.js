"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovieTheater extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Location, Manager, Auditorium }) {
      this.belongsTo(Location, { foreignKey: "location_id" });
      this.belongsTo(Manager, { foreignKey: "manager_id" });
      this.hasMany(Auditorium, { foreignKey: "movietheater_id", onDelete:'CASCADE', hooks:true });
    }
  }
  MovieTheater.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MovieTheater",
    }
  );
  return MovieTheater;
};
