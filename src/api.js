import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToPods(cb) {
    socket.on('pods', pods => cb(null, pods));
    socket.emit('subscribeToPods', 1000);
}

function subscribeToServices(cb) {
    socket.on('services', services => cb(null, services));
    socket.emit('subscribeToServices', 1000);
}

export { subscribeToPods }
export { subscribeToServices }