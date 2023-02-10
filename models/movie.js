"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Schedule, Reservation }) {
      this.hasMany(Schedule, { foreignKey: "movie_sch_id", onDelete:'CASCADE', hooks:true });
      this.hasMany(Reservation, { foreignKey: "movie_res_id", onDelete:'CASCADE', hooks:true });
    }
  }
  Movie.init(
    {
      tittle: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      genre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
