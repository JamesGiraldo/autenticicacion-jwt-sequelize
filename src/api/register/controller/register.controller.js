const { response } = require("express");
const bcrypt = require("bcryptjs");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");

const { generarJWT } = require("../../../helpers/jwt");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../../../config/constantes");

// registro de usuario
const signUp = async (req, res = response) => {
  /** campos del body  */
  const campos = { nombre, email, password } = req.body;

  await models[TABLA.users].findOne({ where: { email: campos.email } }).then(async (result) => {
      if (result) {
        return res.status(HTTP_CODE.CONFLIT).json(HTTP_MESSAGE.EMAIL_ALREADY_EXISTS);
      } else {
        /** Encriptar password */
        const salt = bcrypt.genSaltSync(10);
        campos.password = bcrypt.hashSync(password, salt);

        await models[TABLA.users]
          .create(campos)
          .then(async (user) => {
            // campos para que se vean en respuesta
            const camposVisibles = {
              id: user.id,
              nombre: user.nombre,
              apellido: user.apellido,
              correo: user.email,
              edad: user.edad,
              creado: user.createdAt,
            };
            /** Generar El TOKEN JWT */
            const token = await generarJWT(user);

            res.status(201).json({
              ok: true,
              message: "Usuario registrado exitosamente.",
              user: camposVisibles,
              token: token,
            });
          })
          .catch((error) => {
            res.status(HTTP_CODE.BAD_REQUEST).json(HTTP_MESSAGE.ERROR_SERVER);
          });
      }
    });
};

module.exports = {
    signUp: signUp
};