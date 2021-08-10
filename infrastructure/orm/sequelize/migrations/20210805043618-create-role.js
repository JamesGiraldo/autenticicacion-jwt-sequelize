'use strict';

const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable( TABLA.roles , {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable( TABLA.roles );
  }
};