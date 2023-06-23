const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const { v4 : uuidV4 } = require('uuid');
const path = require('path');
  
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res)=>{
    res.redirect(`/${uuidV4()}`);
    //res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

const server = app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start ", error);
});



const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('uploadImage', (data) => {
        io.emit('refresh', data);
    });

    socket.on("disconnect", () => {
        console.log(socket.id + ' has left the server...')
    });

    socket.on('join-room', (roomId, userId) => {
        console.log('New Client: @' + roomId + ' w/' + userId);
        socket.join(roomId);
        var members = io.sockets.adapter.rooms.get(roomId).size;
        if (members > 1)
        {
            socket.broadcast.to(roomId).emit('user-connected', userId);
        }
        else
        {
            io.to(roomId).emit('begin', true);
        }
    });
});