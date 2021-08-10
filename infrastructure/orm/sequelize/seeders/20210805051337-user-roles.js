"use strict";

const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkInsert(
        TABLA.user_role,
        [
          { user_id: 1, role_id: 1, createdAt: new Date(), updatedAt: new Date() },
          { user_id: 1, role_id: 2, createdAt: new Date(), updatedAt: new Date() },
          { user_id: 2, role_id: 1, createdAt: new Date(), updatedAt: new Date() },
          { user_id: 2, role_id: 1, createdAt: new Date(), updatedAt: new Date() },
        ],
        {}
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete( TABLA.user_role , null, {});
  },
};