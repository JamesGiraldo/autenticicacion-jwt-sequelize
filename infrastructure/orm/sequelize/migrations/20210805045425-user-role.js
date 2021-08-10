'use strict';

const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable( TABLA.user_role , { 
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
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: TABLA.roles,
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

    await queryInterface.dropTable( TABLA.user_role );
  
  }
};
