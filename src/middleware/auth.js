const jwt = require('jsonwebtoken');
const { response } = require('express');

const models = require("../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../config/tablas");

const checkAuth = async (req, res = response, next) => {           
   
    try {
        /**  Leer el Token */
        const token = req.header('x-token');

        /**  validar si el token no es enviado en la petición o sea si no existe. */
        if ( !token ) {
            /** enviar mensaje de estado */
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición.'
            });
        }
        /**  verificar el token generado */
        jwt.verify(token, process.env.JWT_SECRET, async( err, decoded ) => {
            if ( err ) {
                /**  enviar mensaje de estado */
                return res.status(401).json({
                    ok: false,
                    msg: 'Token inválido.'
                });
            } else {
                
                /**  enviar el token */
                await models[TABLA.users].findByPk( decoded.user.id , { include: TABLA.roles   }).then(  user  => { 
                    
                    // console.log( decoded.user.nombre , " ---- usuario recibido  -----" , user.roles );

                    req.user = user;
                    next();
                })
            }
        });           
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no válido o caducado proporcionado',
            error: error
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}