const { Sequelize } = require('sequelize');
const config = require('../infrastructure/orm/sequelize/config/config');
const db = {};

db.connection = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});

module.exports = db;