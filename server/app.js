const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
  
const app = express();
const PORT = process.env.PORT || 8080;

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cors({
    origin: '*'
}));

app.get('/home', (req, res)=>{
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

const server = app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start ", error);
    }
);

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('New client connected with id #' + socket.id);

    socket.on('uploadImage', (data) => {
        io.emit('refresh', data);
    });

    socket.on("disconnect", () => {
        console.log(socket.id + ' has left the server...')
    });
});