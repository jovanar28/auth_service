"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      User,
      Seat,
      Auditorium,
      Movie,
      Schedule,
      Ticket,
      Payment,
    }) {
      this.belongsTo(User, { foreignKey: "user_res_id" });
      this.belongsTo(Seat, { foreignKey: "seat_res_id" });
      this.belongsTo(Auditorium, { foreignKey: "auditorium_res_id" });
      this.belongsTo(Movie, { foreignKey: "movie_res_id" });
      this.belongsTo(Schedule, { foreignKey: "schedule_id" });
      
      this.hasMany(Ticket, { foreignKey: "ticket_res_id", onDelete:'CASCADE', hooks:true });
      this.hasOne(Payment, { foreignKey: "res_pay_id", onDelete:'CASCADE', hooks:true });
    }
  }
  Reservation.init(
    {
      user_res_id: DataTypes.INTEGER,
      seat_res_id: DataTypes.INTEGER,
      auditorium_res_id: DataTypes.INTEGER,
      movie_res_id: DataTypes.INTEGER,
      schedule_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );
  return Reservation;
};
