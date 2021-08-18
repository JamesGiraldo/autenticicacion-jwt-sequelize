'use strict';

const { TABLA }  = require('../../../../config/tablas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable( TABLA.user_curso , { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: TABLA.users,
          key: 'id'
        }    
      },
      curso_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: TABLA.cursos,
          key: 'id'
        }    
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
    await queryInterface.dropTable( TABLA.user_curso );  
  }
};
