"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auditorium extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ MovieTheater, Schedule, Seat }) {
      this.belongsTo(MovieTheater, { foreignKey: "movietheater_id" });
      this.hasMany(Schedule, { foreignKey: "movie_sch_id", onDelete:'CASCADE', hooks:true });
      this.hasMany(Seat, { foreignKey: "auditorium_seat_id", onDelete:'CASCADE', hooks:true });
    }
  }
  Auditorium.init(
    {
      number_of_seats: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Auditorium",
    }
  );
  return Auditorium;
};
