require('dotenv').config();
const colors = require('colors');
const http = require('http');
const app = require('./app');
const { connection } = require('../config/conecction-sequelize');

/**   Crear el servidor de express */
const serve = http.createServer(app);

/** ejecutar servidor en el puerto que esta las variables de entorno */
serve.listen( process.env.PORT, async () => {
    /** imprimir respuesta de ejecución del servidor */
    console.log(`Servidor corriendo en el puerto`.magenta, `http://localhost:${process.env.PORT}`.cyan);

    connection.authenticate().then( () => {        
        console.log(`Conexion a la base de datos exitosa`.yellow);            
    }).catch( (err) => {
        console.log(`Error al conectar a la base de datos: `.red );
    });
});