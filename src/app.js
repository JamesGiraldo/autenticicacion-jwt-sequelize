require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");

// middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/** rutas  */
app.use('/api/v1', require('./routes/v1/routes'));


/** esportar el modulo app, para poderlo usar donde sea XD */
module.exports = app;