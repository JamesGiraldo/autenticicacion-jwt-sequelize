const { response } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const models = require("../../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../../config/tablas");

const { generarJWT } = require("../../helpers/jwt");

// registro de usuario
const signUp = async (req, res = response) => {
  /** campos del body  */
  const campos = { nombre, email, password } = req.body;

  await models[TABLA.users].findOne( { where: { email: campos.email } } ).then(async (result) => {
      if (result) {
        return res
          .status(400)
          .json({ ok: false, message: "El correo ya existe." });
      } else {
        /** Encriptar password */
        const salt = bcrypt.genSaltSync(10);
        campos.password = bcrypt.hashSync(password, salt);

        await models[TABLA.users]
          .create(campos)
          .then(async (user) => {

            /** Generar El TOKEN JWT */
            const token = await generarJWT( user );

            res.status(201).json({
              ok: true,
              message: "usuario registrado exitosamente.",
              user: { id: user.id, nombre: user.nombre, correo: user.email, creado: user.createdAt },
              token: token,
            });
          }).catch((error) => {
            res.status(400).json({
              ok: false,
              message: "Problemas al registrarse.",
              error: error,
            });
          });
      }
    });
};

const singIn = async (req, res = response) => {
  /** para obtener los valores del body */
  const campos = { email, password } = req.body;

  await models[TABLA.users].findOne({ where: { email: campos.email } }).then( user => {
      if ( !user ) {
        res.status(401).json({
          ok: false,
          message: "Credenciales invalidas",
        });
      } else {
        /** Verificar Contraseña encriptada. */
        bcrypt.compare(password, user.password, async (err, result) => {
          /** valdiar si el password no existe */
          if (!result) {
            /** responder el estado y mensaje formato json */
            return res.status(400).json({
              ok: false,
              message: "Contraseña o email incorrectos.",
            });
          } else {
            /** Generar El TOKEN JWT */
            const token = await generarJWT(user);

            res.status(200).json({
              ok: true,
              message: "Autentificación exitosa",
              token: token,
              user: { id: user.id, nombre: user.nombre, correo: user.email, creado: user.createdAt, actualizado: user.updatedAt},
            });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        ok: false,
        message: "Problemas con la autentificacion en el sistema.",
        error: error,
      });
    });
};

module.exports = {
  signUp: signUp,
  singIn: singIn,
};
