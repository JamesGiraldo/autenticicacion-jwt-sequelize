"use strict";
const { Model } = require("sequelize");
const { TABLA } = require("../../../../config/tablas");

module.exports = (sequelize, DataTypes) => {
  class User_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo( models[TABLA.users], { foreignKey: "user_id" } );
      this.belongsTo( models[TABLA.roles], { foreignKey: "role_id" } );
    }
  }
  User_role.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },{
      sequelize,
      modelName: TABLA.user_role,
    }
  );
  return User_role;
};
