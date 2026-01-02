import { Server as IOServer } from 'socket.io';
import http from 'http';

export function attachSockets(server: http.Server) {
  const io = new IOServer(server, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN || 'http://localhost:8100',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    socket.on('hello', (payload) => {
      socket.emit('hello:ack', { received: true, payload });
    });

    socket.on('broadcast', (msg) => {
      socket.broadcast.emit('broadcast', msg);
    });
  });

  return io;
}
