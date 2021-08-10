const express = require('express');
const route = express();
const path = require('path');

/** requerir el archivos de ruta */
route.use( require('../../api/auth/router/routes') );
route.use( require('../../api/change-password/router/routes') );
route.use( require('../../api/posts/router/routes') );
route.use( require('../../api/register/router/routes') );
route.use( require('../../api/users/router/routes') );


/** esportar el modulo routes, para poderlo usar donde sea XD */
module.exports = route;