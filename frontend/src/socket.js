import io from 'socket.io-client';
import { BASE_URL } from './constants';

let socket;

export const initiateSocket = (videoLink) => {
  socket = io(BASE_URL);
  console.log(`Connecting socket...`);
  if (socket) socket.emit('setVideo', videoLink);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
}

export const subscribeToLoadingUpdates = (cb) => {
  if (!socket) return(true);

  socket.on('statusUpdate', data => {
    console.log('statusUpdate event received!', data);
    return cb(null, data);
  });
}

export const susbcribeToFinish = (cb) => {
  if (!socket) return(true);

  socket.on('statusUpdate', data => {
    console.log('Websocket event received!', data);
    return cb(null, data);
  });
}

export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
}
