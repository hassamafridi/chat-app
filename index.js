let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});




//websocket
io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });
    // socket.on('chat-message', (data) => {
    //     this.messages.push({
    //         message: data.message,
    //         type: 1,
    //         user: data.user,
    //     });
    // });    
    });
http.listen(3000, () => {
    console.log('Listening on port *: 3000');
});