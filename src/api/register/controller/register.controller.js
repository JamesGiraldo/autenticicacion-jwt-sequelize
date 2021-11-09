const { response } = require("express");
const bcrypt = require("bcryptjs");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { Newasignacion, asignacion } = require('../../roles/controller/Roles-users.controller');

const { generarJWT } = require("../../../helpers/jwt");
const { HTTP_CODE, HTTP_MESSAGE, USER_TYPE } = require("../../../../config/constantes");

const NewUser = async (cuerpo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const user = await models[TABLA.users].create(cuerpo, { transaction });
        if (!user) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(user);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// registro de usuario
const signUp = async (req, res = response) => {
  try {
    const campos = { nombre, apellido, edad, email, password } = req.body;
    const userEmail = await models[TABLA.users].findOne({ where: { email: campos.email } })
    if (userEmail) {
      return res.status(HTTP_CODE.CONFLIT).json(HTTP_MESSAGE.EMAIL_ALREADY_EXISTS);
    } else {
      /** Encriptar password */
      const salt = bcrypt.genSaltSync(10);
      campos.password = bcrypt.hashSync(password, salt);

      // POSTS new user
      const user = await NewUser(campos);
      const asignacionRoleDefault = await Newasignacion({ user_id: user.id, role_id: USER_TYPE.ESTUDENT })

      /** Generar El TOKEN JWT */
      const token = await generarJWT(user);
      const camposVisibles = {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.email,
        edad: user.edad,
        creado: user.createdAt,
      };
      res.status(HTTP_CODE.SUCCESS).json({
        ok: true,
        message: "Usuario registrado exitosamente.",
        user: camposVisibles,
        token: token,
        asignacionRoleDefault: asignacionRoleDefault
      });
    }
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json(error);
  }
};

module.exports = {
  signUp: signUp
};