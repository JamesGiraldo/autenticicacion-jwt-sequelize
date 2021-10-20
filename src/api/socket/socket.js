module.exports = (io) => {

    io.on('connection', (socket) => {
        // console.log("usuario conectado", socket.id)
        socket.on('sendMessage', (messageInfo) => {
            socket.broadcast.emit('reciveMessage', messageInfo)
        })
    });

}
