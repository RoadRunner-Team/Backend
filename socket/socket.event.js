module.exports = io => {
  io.sockets.on('connection', socket => {
    socket.on('join', room => {
      // console.log(socket.id, room);
      socket.join(room);
      socket.room = room;
    });

    socket.on('leave', () => {
      // console.log(socket.room);
      socket.leave(socket.room);
      delete socket.room;
    });

    socket.on('message', message => {
      io.sockets.in(socket.room).emit('message', { ...message, date: new Date() });
    });

    socket.on('disconnect', user => {
      // console.log('disconnect', user);
    });
  });
};
