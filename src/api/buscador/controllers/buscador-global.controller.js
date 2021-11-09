const { response } = require("express");
const { Op } = require("sequelize");

const models = require("../../../../infrastructure/orm/sequelize/models");
const { TABLA } = require("../../../../config/tablas");
const { HTTP_CODE, HTTP_MESSAGE, USER_TYPE } = require("../../../../config/constantes");

// campos para que no se vean en respuesta
const creado = "createdAt";
const actualizado = "updatedAt";
const composNoVisible = ["password", creado, actualizado];
const camposNoVisibleDate = [creado, actualizado];

/** Get TODO */
const getBusqueda = async (req, res = response) => {

    /** obtener el valor de los parametros de la url */
    const busqueda = req.params.busqueda;

    /**  esto es para realizar la busqueda  sencible :V  */
    // const regex = new RegExp(busqueda, 'i');
    /** para evitar posibles errores */
    try {
        /** consultar los modelos de una forma simultanea */
        const [users, cursos, posts] = await Promise.all([
            await models[TABLA.users].findAll({ where: { nombre: { [Op.like]: `%${busqueda}%` }}, attributes: { exclude: composNoVisible } } ),
            await models[TABLA.cursos].findAll({ where: { nombre: { [Op.like]: `%${busqueda}%` }}, attributes: { exclude: camposNoVisibleDate } } ),
            await models[TABLA.posts].findAll({ where: { title: { [Op.like]: `%${busqueda}%` }}, attributes: { exclude: camposNoVisibleDate } } ),
        ])
        /** responder con un ok  */
        res.json({
            ok: true,
            users: users,
            cursos: cursos,
            posts: posts
        });
        /** Si lapetición esta mal mostrar el error. */
    } catch (error) {
        console.log(error);
        res.status(500).json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
    }
};

const getDocumentoColeccion = async (req, res = response) => {
    try {
        /** obtener el valor de los parametros de la url */
        const tabla = req.params.tabla;
        const busqueda = req.params.busqueda;

        let data = [];
        /** para selección de casos con el switch case */
        switch (tabla) {
            case TABLA.users:
                data =  await models[TABLA.users].findAll({
                    include: {
                        model: models[TABLA.roles],
                        as: TABLA.roles,
                        attributes: { exclude: camposNoVisibleDate }
                    },
                    where: {
                        [Op.or]: [
                            {nombre: { [Op.like]: `%${busqueda}%` }},
                            {apellido: { [Op.like]: `%${busqueda}%` }}
                        ]
                    },
                    attributes: { exclude: composNoVisible }
                });
                break;
            case 'estudiantes':
                data = await models[TABLA.users].findAll({
                    include: {
                        model: models[TABLA.roles],
                        as: TABLA.roles,
                        attributes: { exclude: camposNoVisibleDate },
                        where: {
                          id: USER_TYPE.ESTUDENT,
                        }
                    },
                    where: {
                        [Op.or]: [
                            {nombre: { [Op.like]: `%${busqueda}%` }},
                            {apellido: { [Op.like]: `%${busqueda}%` }}
                        ]
                    },
                    attributes: { exclude: composNoVisible }
                });
                break;
            case TABLA.cursos:
                data = await models[TABLA.cursos].findAll({ where: { nombre: { [Op.like]: `%${busqueda}%` }}, attributes: { exclude: camposNoVisibleDate }});
                break;
            case TABLA.posts:
                data = await models[TABLA.posts].findAll({
                    where: {
                        [Op.or]: [
                            {title: { [Op.like]: `%${busqueda}%` }},
                            {cuerpo: { [Op.like]: `%${busqueda}%` }}
                        ]
                    },
                    attributes: { exclude: camposNoVisibleDate }
                });
                break;
            /** si es un porible error imprimir este mensaje y no permite continuar gracias al return */
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/ cursos / publicaciones.'
                });
        }
        /** responder con un ok */
        res.status(200).json({
            ok: true,
            resultados: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(HTTP_MESSAGE.INTERNAL_SERVER_ERROR);
    }
    /** Si lapetición esta mal mostrar el error.  */
};

module.exports = {
    getBusqueda: getBusqueda,
    getDocumentoColeccion: getDocumentoColeccion
};
