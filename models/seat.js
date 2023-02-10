"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Auditorium, Reservation }) {
      this.belongsTo(Auditorium, { foreignKey: "auditorium_seat_id" });
      this.hasOne(Reservation, { foreignKey: "seat_res_id", onDelete:'CASCADE', hooks:true });
    }
  }
  Seat.init(
    {},
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
