'use strict';
const { Model } = require('sequelize');
const { TABLA } = require('../../../../config/tablas');

module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany( models[TABLA.users], { as: TABLA.users, through: TABLA.user_curso, foreignKey: "curso_id" } );
    }
  };
  Curso.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {       
        len: {
          args: [ 3, 255 ],
          msg: "El nombre tiene que ser minimo de 3 caracteres."
        }
      }
    },
    horario: {
      type: DataTypes.STRING,      
      validate: {       
        len: {
          args: [ 5, 255 ],
          msg: "El horario tiene que ser minimo de 5 caracteres."
        }
      }
    },
    fecha_inicio: DataTypes.DATEONLY,
    fecha_fin: DataTypes.DATEONLY,
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: TABLA.cursos,
  });
  return Curso;
};