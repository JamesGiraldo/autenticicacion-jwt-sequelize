const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../../../config/constantes");

// GET /api/cursos
const index = async (req, res = response) => {
  await models[TABLA.cursos].findAll({ attributes: { exclude: ["createdAt", "updatedAt", "userId", "UserId"] } }).then( ( cursos ) => {
      res.status( HTTP_CODE.SUCCESS ).json( cursos );
    }).catch( (err) => {
      res.status( HTTP_CODE.NOT_FOUND ).json( HTTP_MESSAGE.NO_RESULT );
    });
};

// GET /api/crusos/:id
const show = async (req, res = response) => {
  res.status( HTTP_CODE.SUCCESS ).json({ 
      id: req.curso.id, 
      nombre: req.curso.nombre, 
      horario: req.curso.horario, 
      fecha_inicio: req.curso.fecha_inicio, 
      fecha_fin: req.curso.fecha_fin, 
      estado: req.curso.state 
    });
};

// CREATE /api/cursos
const create = async (req, res = response) => {
  /** obtener el valor del body  */
  const cuerpo = { ...req.body };

  await models[TABLA.cursos].create( cuerpo )
    .then(( curso ) => {
      res.status( HTTP_CODE.SUCCESS ).json( curso );
    }).catch((err) => {
      res.status( HTTP_CODE.BAD_REQUEST ).json( HTTP_MESSAGE.INTERNAL_SERVER_ERROR );
    });
};

// UPDATE /api/cursos/:id
const update = async (req, res = response) => {
  /** obtener el valor del body  */
  const cuerpoUpdate = { ...req.body };
  await req.curso.update(cuerpoUpdate, { where: { id: req.curso.id } }).then( () => {
    res.status( HTTP_CODE.SUCCESS ).json( req.curso );
  }).catch((err) => {
    res.status( HTTP_CODE.BAD_REQUEST ).json( HTTP_MESSAGE.INTERNAL_SERVER_ERROR );
  });
};

// DELEE /api/cursos/:id
const destroy = async (req, res = response) => {
  await req.curso.destroy({ where: { id: req.curso.id } }).then( () => {
    res.status( HTTP_CODE.SUCCESS ).json( HTTP_MESSAGE.SUCCESS );
  }).catch((err) => {
    res.status( HTTP_CODE.BAD_REQUEST ).json( HTTP_MESSAGE.INTERNAL_SERVER_ERROR );
  });
};


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
