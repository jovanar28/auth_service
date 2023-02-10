"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role,Reservation }) {
      this.belongsTo(Role, {foreignKey:"role_id"});
      this.hasMany(Reservation, { foreignKey: "user_res_id", onDelete:'CASCADE', hooks:true });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      credit_card_num: DataTypes.INTEGER
     
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
