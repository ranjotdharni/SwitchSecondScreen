const express = require('express');
const io = require('socket.io-client');
const fs = require('fs');
const path = require('path');
  
const app = express();
const socket = io('https://second-screen-q62t.onrender.com', {secure: true}); //https://second-screen-q62t.onrender.com {secure: true}
const PORT = process.env.PORT || 9090;
const imgPath = path.join(__dirname, 'img', 'test.jpg');

const uploadImage = (filePath) => {
    fs.readFile(filePath, 'base64', (err, data) => {
      if (err) {
        console.error('Error reading image file:', err);
      } else {
        // Send the image data to the server
        socket.emit('uploadImage', data);
      }
    });
};
app.listen(PORT, (error) => {
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    else
        console.log("Error occurred, server can't start ", error);
});

socket.on('connect', () => {
    console.log(socket.id + ' has connected');
    uploadImage(imgPath);
    setInterval(function() {
      uploadImage(imgPath);
    }, 500);
});

socket.on('connect_error', () => {
    console.log(socket.id + ' has ERROR!');
});

socket.on('disconnect', () => {
    console.log(socket.id + ' left...');
  });