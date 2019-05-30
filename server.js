var express = require('express');
var path = require('path');


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 3000;
server.listen(PORT);
console.log('Server is running at port: ' + PORT);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const connections = [];

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(socket.id);
    console.log(' %s sockets is connected', connections.length);
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        console.log(' %s sockets is connected', connections.length);
    });

    socket.on('sending message', (message) => {
        console.log('Message is received :', message);
        //send to only initiated client
       // socket.emit('new message', {message: "sent "+message});
        //send to all client
        io.sockets.emit('new message', {message: "sent "+message});
        //broadcast to all client except initiaited one
    // 	socket.broadcast.emit('new message', {message: "sent "+message})
    });

});