const express = require('express');
const io = require('socket.io-client');
const path = require('path');
  
const app = express();
const socket = io('https://switch-second-screen.onrender.com');
const PORT = process.env.PORT || 9090;

app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else 
        console.log("Error occurred, server can't start ", error);
    }
);

socket.on('connect', () => {
    console.log(socket.id + ' has connected');
});

socket.on('disconnect', () => {
    console.log(socket.id + ' left...'); // undefined
  });