const jwt = require("jsonwebtoken");
const { response } = require("express");

const models = require("../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../config/tablas");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../config/constantes");

const checkAuth = async (req, res = response, next) => {
  try {
    /**  Leer el Token */
    const token = req.header("x-token");

    /**  validar si el token no es enviado en la petición o sea si no existe. */
    if (!token) {
      /** enviar mensaje de estado */
      return res.status(HTTP_CODE.UNAUTHORIZED).json(HTTP_MESSAGE.NO_TOKEN);
    }
    /**  verificar el token generado */
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        /**  enviar mensaje de estado */
        return res
          .status(HTTP_CODE.UNAUTHORIZED)
          .json(HTTP_MESSAGE.TOKEN_INVALID);
      } else {
        /**  enviar el token */
        await models[TABLA.users]
          .findByPk(decoded.user.id, { include: TABLA.roles })
          .then((user) => {
            // console.group( "coje------>" , user.roles )
            // console.log( decoded.user.nombre , " ---- usuario recibido  -----" , user.roles.get( "id" ) );
            // const newUser = JSON.parse(JSON.stringify(user, null, 4));
            // console.log( "ViooO -----> ", newUser.id);

            req.user = user;
            next();
          });
      }
    });
  } catch (error) {
    return res.status(HTTP_CODE.UNAUTHORIZED).json(HTTP_MESSAGE.TOKEN_EXPIRED);
  }
};

module.exports = {
  checkAuth: checkAuth,
};
