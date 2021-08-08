const express = require('express');
const route = express();
const path = require('path');

/** requerir el archivos de ruta */
route.use( require('./auth') );
route.use( require('./posts') );
route.use( require('./users') );


/** esportar el modulo routes, para poderlo usar donde sea XD */
module.exports = route;