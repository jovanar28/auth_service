"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Seat, Auditorium, Movie, Schedule, Reservation }) {
      this.belongsTo(User, { foreignKey: "user_tk_id" });
      this.belongsTo(Seat, { foreignKey: "seat_tk_id" });
      this.belongsTo(Auditorium, { foreignKey: "auditorium_tk_id" });
      this.belongsTo(Movie, { foreignKey: "movie_tk_id" });
      this.belongsTo(Schedule, { foreignKey: "sch_tk_id" });
      this.belongsTo(Reservation, { foreignKey: "ticket_res_id" });
    }
  }
  Ticket.init(
    {
      price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Ticket",
    }
  );
  return Ticket;
};
