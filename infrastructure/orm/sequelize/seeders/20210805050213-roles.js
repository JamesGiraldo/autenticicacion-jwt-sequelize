"use strict";

const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.bulkInsert(
        TABLA.roles,
        [
          { role: "admin", createdAt: new Date(), updatedAt: new Date() },
          { role: "user", createdAt: new Date(), updatedAt: new Date() },
          { role: "estudiante", createdAt: new Date(), updatedAt: new Date() },
          { role: "editor", createdAt: new Date(), updatedAt: new Date() },
        ],
        {}
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete( TABLA.roles , null, {});
  },
};