'use strict';

const { TABLA }  = require('../../../../config/tablas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable( TABLA.cursos , {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      horario: {
        type: Sequelize.STRING
      },
      fecha_inicio: {
        type: Sequelize.DATEONLY
      },
      fecha_fin: {
        type: Sequelize.DATEONLY
      },
      state: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable( TABLA.cursos );
  }
};