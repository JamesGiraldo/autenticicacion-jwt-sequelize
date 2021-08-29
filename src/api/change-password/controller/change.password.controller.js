const { response } = require("express");
const bcrypt = require("bcryptjs");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../../../config/constantes");

const updatePasswrod = async (req, res = response) => {

  try {
    /** tomar el id de los parametros  */
    const id = req.params.id;
    /** obtener el valor del body  */
    const cuerpoUpdate = { password, lastPassword } = req.body;
    const user = await models[TABLA.users].findByPk(id);
    if (user) {
      /** Verificar Contraseña encriptada. */
      bcrypt.compare(lastPassword, user.password, async (err, result) => {
        /** valdiar si el password no existe */
        if (!result) {
          /** responder el estado y mensaje formato json */
          return res.status(HTTP_CODE.UNAUTHORIZED).json(HTTP_MESSAGE.CREDENTIAL_INCORRECT);
        } else {
          // Encriptar contraseña
          const salt = bcrypt.genSaltSync(10);
          cuerpoUpdate.password = bcrypt.hashSync(
            cuerpoUpdate.password,
            salt
          );

          if (password === lastPassword) {
            res.status(HTTP_CODE.CONFLIT).json(HTTP_MESSAGE.PASSWORD_ALREADY_EXISTS);
          } else {
            /** actualizar el campo del ususario :D  */
            const userUpdate = await user.update(cuerpoUpdate);
            if (userUpdate) {
              res.status(HTTP_CODE.SUCCESS).json(HTTP_MESSAGE.SUCCESS);
            } else {
              /** Si no recibe la respuesta. */
              res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.NO_RESULT);
            }
          }
        }
      });
    } else {
      /** Si no recibe el user por el id */
      res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.USER_NOT_FOUND_BY_ID);
    }
  } catch (error) {
    /** Si lapetición esta mal mostrar el error. */
    res.status(HTTP_CODE.SERVER_ERROR).json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
  }

};

/** esportar los metodo o modulos del controlador. */
module.exports = {
  updatePasswrod: updatePasswrod
};