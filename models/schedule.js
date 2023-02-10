"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Auditorium, Movie, Reservation }) {
      this.belongsTo(Auditorium, { foreignKey: "auditorium_sch_id" });
      this.belongsTo(Movie, { foreignKey: "movie_sch_id" });
      this.hasMany(Reservation, { foreignKey: "schedule_id", onDelete:'CASCADE', hooks:true });
    }
  }
  Schedule.init(
    {
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME,
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
