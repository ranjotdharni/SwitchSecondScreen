const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});

const myVideo = document.createElement('video');
myVideo.muted = true;

socket.on('begin', (vars) => {
    navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen"}
    }).then(stream => {
        addVideoStream(myVideo, stream);
    
        socket.on('user-connected', (userId) => {
            connectToNewUser(userId, stream);
        });
    });
});

myPeer.on('call', call => {
    call.answer(window.localStream);
    //showConnectedContent();
    call.on('stream', (stream) => {
        addVideoStream(myVideo, stream);
    });
});

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    call.on('close', () => {
        video.remove();
    });
}