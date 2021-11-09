require('dotenv').config();
const colors = require('colors');
const http = require('http');
const app = require('./app');
const { Server } = require("socket.io");
const { connection } = require('../config/conecction-sequelize');
const { cors } = require('../config/constantes')

/**   Crear el servidor de express */
const serve = http.createServer(app);

const io = new Server(serve, { cors: cors });
require('./api/socket/socket')(io)

/** ejecutar servidor en el puerto que esta las variables de entorno */
serve.listen( process.env.PORT, async () => {
    try {
      /** imprimir respuesta de ejecución del servidor */
      console.log(`Servidor corriendo en el puerto`.magenta, ` ${process.env.DB_HOST}:${process.env.PORT}`.cyan);

      await connection.authenticate();
      console.log(`Conexion a la base de datos exitosa`.yellow);
    } catch ( error ) {
      console.log(`Error al conectar a la base de datos: `.red );
    }
});
