const express = require('express');
const route = express();
const path = require('path');

/** requerir el archivos de ruta */

// RUTAS DE AUTENTICACION( LOGIN ) 
route.use( require('../../api/auth/router/routes') );

// RUTAS DE UPDATE PASSWORD( CAMBIAR PASSWORD ) 
route.use( require('../../api/change-password/router/routes') );

// RUTAS DE ( CURSOS )
route.use( require('../../api/cursos/router/routes') );

// RUTAS DE ( PUBLICACIONES ) 
route.use( require('../../api/posts/router/routes') );

// RUTAS DE AUTENTICACION( REGISTRO ) 
route.use( require('../../api/register/router/routes') );

// RUTAS DE USERS( USUARIOS ) 
route.use( require('../../api/roles/routes/routes') );

// RUTAS DE USERS( USUARIOS ) 
route.use( require('../../api/users/router/routes') );


/** esportar el modulo routes, para poderlo usar donde sea XD */
module.exports = route;