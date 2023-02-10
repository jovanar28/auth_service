"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
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
      Reservation,
    }) {
      this.belongsTo(User, { foreignKey: "user_pay_id" });
      this.belongsTo(Seat, { foreignKey: "seat_pay_id" });
      this.belongsTo(Auditorium, { foreignKey: "auditorium_pay_id" });
      this.belongsTo(Movie, { foreignKey: "movie_pay_id" });
      this.belongsTo(Schedule, { foreignKey: "sch_pay_id" });
      this.belongsTo(Reservation, { foreignKey: "res_pay_id" });
    }
  }
  Payment.init(
    {
      user_pay_id: DataTypes.INTEGER,
      seat_pay_id: DataTypes.INTEGER,
      auditorium_pay_id: DataTypes.INTEGER,
      movie_pay_id: DataTypes.INTEGER,
      sch_pay_id: DataTypes.INTEGER,
      res_pay_id: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
