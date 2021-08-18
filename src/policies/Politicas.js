const { response } = require("express");

const { HTTP_CODE, HTTP_MESSAGE } = require("../../config/constantes");

const authUserType = (roles = [], req, res = response, next) => {
 
  try {
    // console.log("Roles: ", roles, "User->", req.user.id);
    const found = req.user.roles.some( ( r ) => roles.includes( r.id ) );
    if (!found) {    
      /**  enviar mensaje de estado */
      return res.status( HTTP_CODE.UNAUTHORIZED ).json( HTTP_MESSAGE.CREDENTIAL_INCORRECT );
    } else { next() }   
  } catch (error) {
    res.status( HTTP_CODE.SERVER_ERROR ).json( HTTP_MESSAGE.SERVER_ERROR );
  }

};

const auth = ( ...args ) => authUserType.bind( this, args );

module.exports = {
  auth,
};
