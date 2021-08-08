const { response } = require("express");

const models = require("../../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../../config/tablas");

// campos para que no se vean en respuesta
const composNoVisible = ["password", "createdAt", "updatedAt"];

// GET /api/users
const index = async (req, res = response) => {
  await models[TABLA.users]
    .findAll({
      attributes: { exclude: composNoVisible },
      include: TABLA.roles,
    })
    .then((users) => {
      res.status(201).json({
        ok: true,
        [TABLA.users]: users,
        total: users.length,
      });
    })
    .catch((err) => {
      res.status(400).json({
        ok: false,
        error: err,
      });
    });
};

// GET /api/users/:id
const show = async (req, res = response) => {
  /** tomar el id de los parametros  */
  const id = req.params.id;

  await models[TABLA.users]
    .findByPk(id, {
      attributes: { exclude: composNoVisible },
      include: TABLA.roles,
    })
    .then((user) => {
      if (user) {
        res.status(200).json({
          ok: true,
          message: "Usuario encontrado",
          user: user,
        });
      } else {
        /** Si no recibe la respuesta. */
        res.status(404).json({
          ok: false,
          message: "Usuario no encontrado.",
        });
      }
    })
    .catch((error) => {
      /** Si lapetición esta mal mostrar el error. */
      res.status(500).json({
        ok: false,
        message: "Algo salió mal en la peticion.",
        error: error,
      });
    });
};

// PUT /api/users/:id
const update = async (req, res = response) => {
  /** tomar el id de los parametros  */
  const id = req.params.id;
  /** para obtener los valores del body */
  const campos = { ...req.body} ;

  await models[TABLA.users]
    .findByPk(id, { attributes: { exclude: composNoVisible } })
    .then( async(user) => {
      if (user) {
      
        await user.update( campos, { where: { id: user.id } } ).then( result =>  { 
          res.status(200).json({
            ok: true,
            message: 'Usuario actualizado correctamente',
            [TABLA.users]: user,
          });
        })

      } else {
        /** Si no recibe la respuesta. */
        res.status(404).json({
          ok: false,
          message: "Usuario no encontrado.",
        });
      }
    })
    .catch((error) => {
      /** Si lapetición esta mal mostrar el error. */
      res.status(500).json({
        ok: false,
        message: "Algo salió mal en la peticion.",
        error: error,
      });
    });
};

// DELEE /api/users/:id
const destroy = async (req, res = response) => {

  /** tomar el id de los parametros  */
  const id = req.params.id;

  await models[TABLA.users].findByPk( id ).then( async( user ) => {
    if (post) {

      await user.destroy( { where: { id: user.id } } ).then( result =>  { 
        res.status(200).json({
          ok: true,
          message: 'Usuario eliminado correctamente',          
        });
      })

    } else {
      /** Si no recibe la respuesta. */
      res.status(404).json({
        ok: false,
        message: 'Ususario no encontrado.',
      });
    }
  }).catch(error => {
    /** Si lapetición esta mal mostrar el error. */
    res.status(500).json({
      ok: false,
      message: 'Algo salió mal en la peticion',
      error: error
    });
  })

};

module.exports = {
  index: index,
  show: show,
  update: update,
  destroy: destroy,
};
