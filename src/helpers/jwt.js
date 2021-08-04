const jwt = require('jsonwebtoken');

/** generar token recibiendo el id correspondiente */
const generarJWT = (id) => {
    return new Promise(async (resolve, reject) => {
        try {               
            const token = await jwt.sign( { id }, process.env.JWT_SECRET, { expiresIn: '12h' });
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