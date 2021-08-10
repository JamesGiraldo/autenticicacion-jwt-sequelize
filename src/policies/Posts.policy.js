const { response } = require("express");

const authUserType = (roles = [], req, res = response, next) => {
 
  try {
    // console.log("Roles: ", roles, "User->", req.user.id);
    const found = req.user.roles.some( ( r ) => roles.includes( r.id ) );

    if (!found) {    
      /**  enviar mensaje de estado */
      return res.status(401).json({
        ok: false,
        message: 'No esta autorizado para realizar esta peticion, por favor cominique con el administrador.'
      });
    } else { next() }   

  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error interno en el servidor, favor de comunicarse con su administrador.'
    });
  }

};

const auth = (...args) => authUserType.bind(this, args);

module.exports = {
  auth,
};
