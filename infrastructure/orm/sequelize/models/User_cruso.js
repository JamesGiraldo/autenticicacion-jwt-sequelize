"use strict";
const { Model } = require("sequelize");
const { TABLA } = require("../../../../config/tablas");

module.exports = (sequelize, DataTypes) => {
  class User_curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here     
      this.belongsTo( models[TABLA.users], { foreignKey: "user_id" } );
      this.belongsTo( models[TABLA.cursos], { foreignKey: "curso_id" } );
    }
  }
  User_curso.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },{
      sequelize,      
      modelName: TABLA.user_curso,
    }
  );
  return User_curso;
};
