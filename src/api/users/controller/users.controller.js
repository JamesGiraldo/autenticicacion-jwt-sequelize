const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_CODE, HTTP_MESSAGE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const composNoVisible = ["password", "createdAt", "updatedAt"];

// GET /api/users
const index = async (req, res = response) => {
  await models[TABLA.users]
    .findAll({
      attributes: { exclude: composNoVisible },
      include: {
        model: models[TABLA.roles],
        as: TABLA.roles,
        attributes: { exclude: ["createdAt", "updatedAt"] }
      }
    })
    .then((users) => {
        res.status( HTTP_CODE.SUCCESS ).json( users );
    })
    .catch((err) => {
      res.status( HTTP_CODE.SERVER_ERROR ).json( HTTP_MESSAGE.INTERNAL_SERVER_ERROR );
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
        res.status( HTTP_CODE.SUCCESS ).json( user );
      } else {
        /** Si no recibe la respuesta. */
        res.status( HTTP_CODE.NOT_FOUND ).json( HTTP_MESSAGE.USER_NOT_FOUND_BY_ID );
      }
    })
    .catch((error) => {
      /** Si lapetición esta mal mostrar el error. */
      res.status( HTTP_CODE.SERVER_ERROR ).json( HTTP_MESSAGE.INTERNAL_SERVER_ERROR );
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
          res.status( HTTP_CODE.SUCCESS ).json( user );
        })

      } else {
        /** Si no recibe la respuesta. */
        res.status( HTTP_CODE.NOT_FOUND ).json( HTTP_MESSAGE.USER_NOT_FOUND_BY_ID );
      }
    })
    .catch((error) => {
      /** Si lapetición esta mal mostrar el error. */
      res.status(HTTP_CODE.SERVER_ERROR ).json( HTTP_MESSAGE.SERVER_ERROR );
    });
};

// DELEE /api/users/:id
const destroy = async (req, res = response) => {

  /** tomar el id de los parametros  */
  const id = req.params.id;

  await models[TABLA.users].findByPk( id ).then( async( user ) => {
    if ( user ) {

      await user.destroy( { where: { id: user.id } } ).then( result =>  {
        res.status( HTTP_CODE.SUCCESS ).json( HTTP_MESSAGE.SUCCESS );
      })

    } else {
      /** Si no recibe la respuesta. */
      res.status( HTTP_CODE.NOT_FOUND ).json( HTTP_MESSAGE.USER_NOT_FOUND_BY_ID );
    }
  }).catch(error => {
    /** Si lapetición esta mal mostrar el error. */
    res.status(  HTTP_CODE.NOT_FOUND ).json( HTTP_MESSAGE.USER_NOT_FOUND_BY_ID );
  })

};

module.exports = {
  index: index,
  show: show,
  update: update,
  destroy: destroy,
};
