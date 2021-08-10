"use strict";

const models = require("../models");
const bcrypt = require("bcryptjs");

const { TABLA, MODELS }  = require('../../../../config/tablas');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const campos = { 
      nombre: "user test",
      email: "test@gmail.com",
      password: "123456" 
    };

    /** Encriptar password */
    const salt = bcrypt.genSaltSync(10);
    campos.password = bcrypt.hashSync( "123456", salt);

    return Promise.all([
      // Create users table
      models[TABLA.users].create({
          nombre: campos.nombre,
          email: campos.email,
          password: campos.password,
          [TABLA.posts]: [
            {
              title: "Post 1",
              cuerpo: "Post 1 body",
            },
            {
              title: "Post 2",
              cuerpo: "Post 2 body",
            },
          ],
        }, {
          include: TABLA.posts
        })     
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.bulkDelete( TABLA.posts, null, {}),
      queryInterface.bulkDelete( TABLA.users, null, {})
    ])

  },
};
