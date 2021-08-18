'use strict';
const { Model } = require('sequelize');
const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany( models[TABLA.posts], { foreignKey: "userId" } );

      this.belongsToMany( models[TABLA.roles], { as: TABLA.roles, through:  TABLA.user_role, foreignKey: "user_id" } );

      this.belongsToMany( models[TABLA.cursos], { as: TABLA.cursos, through:  TABLA.user_curso, foreignKey: "user_id" } );
    }
  };
  User.init({
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
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {       
        len: {
          args: [ 3, 255 ],
          msg: "El apellido tiene que ser minimo de 3 caracteres."
        }
      }
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          args: false,
          msg: "La edad debe ser un número entero."
        }
      }
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser valido."
        },        
      }
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {       
        len: {
          args: [ 6, 100 ],
          msg: "La contraseña debe tener minimo 6 caracteres."
        }
      }
    },
  }, {
    sequelize,
    modelName: TABLA.users ,
  });
  return User;
};