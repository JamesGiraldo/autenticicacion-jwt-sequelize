const { response } = require("express");
const bcrypt = require("bcryptjs");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");

const { generarJWT } = require("../../../helpers/jwt");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../../../config/constantes");

const singIn = async (req, res = response) => {
  /** para obtener los valores del body */
  const campos = { email, password } = req.body;

  await models[TABLA.users]
    .findOne({ where: { email: campos.email } })
    .then((user) => {
      if (!user) {
        res.status( HTTP_CODE.UNAUTHORIZED ).json( HTTP_MESSAGE.CREDENTIAL_INCORRECT );
      } else {
        // campos para que se vean en respuesta
        const camposVisibles = { id: user.id, nombre: user.nombre, correo: user.email };
        /** Verificar Contraseña encriptada. */
        bcrypt.compare(password, user.password, async (err, result) => {
          /** valdiar si el password no existe */
          if (!result) {
            /** responder el estado y mensaje formato json */
            return res.status( HTTP_CODE.BAD_REQUEST ).json( HTTP_MESSAGE.CREDENTIAL_INCORRECT );
          } else {
            /** Generar El TOKEN JWT */
            const token = await generarJWT(user);

            res.status( HTTP_CODE.SUCCESS ).json({
              ok: true,
              message: "Autentificación exitosa",
              token: token,
              user: camposVisibles,
            });
          }
        });
      }
    })
    .catch((error) => {
      res.status( HTTP_CODE.SERVER_ERROR).json( HTTP_MESSAGE.ERROR_SERVER );
    });
};

module.exports = {  
  singIn: singIn
};
