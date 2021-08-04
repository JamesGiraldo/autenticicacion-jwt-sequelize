const express = require('express');
const route = express();
const path = require('path');

/** requerir el archivos de ruta */
route.use( require('./auth') );


/** esportar el modulo routes, para poderlo usar donde sea XD */
module.exports = route;