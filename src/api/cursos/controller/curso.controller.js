const { response } = require("express");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_MESSAGE, HTTP_CODE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const creado = "createdAt";
const actualizado = "updatedAt";
const camposNoVisibleDate = [creado, actualizado];

// GET /api/cursos
const index = async (req, res = response) => {
  try {
    const cursos = await models[TABLA.cursos].findAll({ attributes: { exclude: camposNoVisibleDate } });
    res.status(HTTP_CODE.SUCCESS).json(cursos);
  } catch (error) {
    res.status(HTTP_CODE.NOT_FOUND).json(HTTP_MESSAGE.NO_RESULT);
  }
};

// GET /api/crusos/:id
const show = async (req, res = response) => {
  res.status(HTTP_CODE.SUCCESS).json({
    id: req.curso.id,
    nombre: req.curso.nombre,
    horario: req.curso.horario,
    fecha_inicio: req.curso.fecha_inicio,
    fecha_fin: req.curso.fecha_fin,
    estado: req.curso.state
  });
};

const NewCurso = async (cuerpo) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const curso = await models[TABLA.cursos].create(cuerpo, { transaction });
        if (!curso) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(curso);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// CREATE /api/cursos
const create = async (req, res = response) => {
  try {
    /** obtener el valor del body  */
    const cuerpo = { ...req.body };
    const curso = await NewCurso(cuerpo);
    res.status(HTTP_CODE.SUCCESS).json(curso);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json(error);
  }
};

const UpdateCurso = async (curso, cuerpo, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const cursoUpdate = await curso.update(cuerpo, { where: { id: id }, transaction })
        if (!cursoUpdate) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve(cursoUpdate);
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// UPDATE /api/cursos/:id
const update = async (req, res = response) => {
  try {
    /** obtener el valor del body  */
    const cuerpoUpdate = { ...req.body };
    const id = req.curso.id;
    const curso = req.curso;
    const cursoNew = await UpdateCurso(curso, cuerpoUpdate, id);
    res.status(HTTP_CODE.SUCCESS).json(cursoNew);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
  }
};

const DestroyCurso = async ( curso, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await models.sequelize.transaction(async (transaction) => {
        const cursoDestroy = await curso.destroy({ where: { id: id }, transaction })
        if (!cursoDestroy) return reject(HTTP_MESSAGE.NO_RESULT)
        resolve();
      });
    } catch (error) {
      reject(HTTP_MESSAGE.NOT_FOUND);
    }
  });
}

// DELEE /api/cursos/:id
const destroy = async (req, res = response) => {
  try {
    await DestroyCurso(req.curso, req.curso.id);
    res.status(HTTP_CODE.SUCCESS).json(HTTP_MESSAGE.SUCCESS);
  } catch (error) {
    res.status(HTTP_CODE.BAD_REQUEST).json( error );
  }
};


module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
