const { response } = require("express");
const bcrypt = require("bcryptjs");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");

const { generarJWT } = require("../../../helpers/jwt");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const composNoVisible = ["password", "createdAt", "updatedAt"];

const singIn = async (req, res = response) => {
  try {
    /** para obtener los valores del body */
    const campos = { email, password } = req.body;

    const user = await models[TABLA.users].findOne({ where: { email: campos.email } });
    if (!user) {
      res.status(HTTP_CODE.UNAUTHORIZED).json(HTTP_MESSAGE.CREDENTIAL_INCORRECT);
    } else {
      // campos para que se vean en respuesta
      const camposVisibles = { id: user.id, nombre: user.nombre, apellido: user.apellido, edad: user.edad, correo: user.email };
      /** Verificar Contraseña encriptada. */
      bcrypt.compare(password, user.password, async (err, result) => {
        /** valdiar si el password no existe */
        if (!result) {
          /** responder el estado y mensaje formato json */
          return res.status(HTTP_CODE.BAD_REQUEST).json(HTTP_MESSAGE.CREDENTIAL_INCORRECT);
        } else {
          /** Generar El TOKEN JWT */
          const token = await generarJWT(user);
          res.status(HTTP_CODE.SUCCESS).json({
            ok: true,
            message: "Autentificación exitosa",
            token: token,
            user: camposVisibles,
          });
        }
      });
    }
  } catch (error) {
    res.status(HTTP_CODE.SERVER_ERROR).json(HTTP_MESSAGE.ERROR_SERVER);
  }
};

const renewToken = async (req, res = response) => {
  try {
    /** tomar el uid del usuario */
    const user = req.user;
    /** Generar El TOKEN JWT */
    const token = await generarJWT(user);
    /** Consultar el usuario por id */
    const usuarioDB = await models[TABLA.users].findByPk(user.id, { attributes: { exclude: composNoVisible } });
    res.json({
      ok: true,
      token: token,
      usuario: usuarioDB
    });
  } catch (error) {
    res.status(HTTP_CODE.SERVER_ERROR).json(HTTP_MESSAGE.ERROR_SERVER);
  }
};

module.exports = {
  singIn: singIn,
  renewToken: renewToken,
};
