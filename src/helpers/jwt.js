const jwt = require('jsonwebtoken');

/** generar token recibiendo el user correspondiente */
const generarJWT = ( user ) => {
    return new Promise(async (resolve, reject) => {
        try {               
            const token = await jwt.sign( { user: user }, process.env.JWT_SECRET, { expiresIn: '12h' });
            resolve(token);
        } catch (error) {
            console.log(error);
            reject('No se puedo generar el token.');
        }
    });
};
/** esportar los metodos declarados */
module.exports = {
    generarJWT: generarJWT
};