const post = require('../posts/controller/post.controller');
const models = require("../../../infrastructure/orm/sequelize/models");
const { TABLA, MODELS } = require("../../../config/tablas");


module.exports = (io) => {

    io.on('connection', (socket) => {
        // console.log("usuario conectado", socket.id)
        socket.on('sendMessage', (messageInfo) => {
            socket.broadcast.emit('reciveMessage', messageInfo)
        })
    });

    // const userNamespace = io.of("/publication");
    // userNamespace.on("connection", (socket) => {

    //     socket.emit('new-publication-to-client', {
    //         message: 'Welcome to the publication room'
    //     });

    //     socket.on('new-publication-to-client', (data) => {
    //         console.log(data);
    //     });

    // });

    // const userNamespacePost = io.of("/posts");
    // userNamespacePost.on("connection", async (socket) => {

    //     socket.on('new-post-to-client', (data) => {
    //         console.log(data);
    //     });

    // });

}
