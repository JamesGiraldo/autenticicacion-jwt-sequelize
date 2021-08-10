"use strict";
const { Model } = require("sequelize");
const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsToMany( models[TABLA.users], { as: TABLA.users, through: TABLA.user_role, foreignKey: "role_id" } );
    }
  }
  Role.init({
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: "El nombre del rol tiene que ser minimo de 3 caracteres.",
          },
        },
      },
    },{
      sequelize,
      modelName: TABLA.roles,
    }
  );
  return Role;
};
