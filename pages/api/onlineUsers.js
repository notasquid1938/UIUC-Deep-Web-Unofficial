import { Server } from 'socket.io';

export default async (req, res) => {
  if (!res.socket.server.io) {
    console.log('Setting up WebSocket server...');
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('User connected');
      io.emit('userCount', io.engine.clientsCount);

      socket.on('disconnect', () => {
        console.log('User disconnected');
        io.emit('userCount', io.engine.clientsCount);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};
