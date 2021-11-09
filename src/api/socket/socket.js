module.exports = (io) => {

    io.on('connection', (socket) => {
        // console.log("usuario conectado", socket.id)
        socket.on('sendMessage', (messageInfo) => {
            socket.broadcast.emit('reciveMessage', messageInfo)
        })
    });

    const userNamespace = io.of("/publication");
    userNamespace.on("connection", (socket) => {

        socket.emit('new-publication-to-client', {
            message: 'Welcome to the publication room'
        });

        socket.on('new-publication-to-client', (data) => {
            console.log(data);
        });

    });

}
