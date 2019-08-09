// require express module
const app = require('express')();

// require the http module
const http = require('http').Server(app);

// require the socket.io module
const io = require('socket.io')(http);

// database connection
const MessageController = require('./controllers/MessageController');
const connect = require('./dbconnection');

io.on('connection', (socket) => {

  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join', (room) => {
    // go to new room
    socket.join(room);
    // send all message for that room
    MessageController.list(room).then((messages) => {
      socket.emit('messages', messages);
    });
  });

  socket.on('addMessage', msg => {
    MessageController.save(msg).then((newMessage) => {
      // socket.emit('message', newMessage);
      // socket.to(newMessage.room).emit('message', newMessage);
      io.in(newMessage.room).emit('message', newMessage);
    });
  });

  socket.on('editMessage', msg => {
    MessageController.update(msg).then((newMessage) => {
      socket.to(newMessage.room).emit('messageUpdated', newMessage);
    });
  });

  socket.on('removeMessage', msg => {
    MessageController.delete(msg).then(() => {
      io.in(msg.room).emit('messageDeleted', msg);
    });
  });

});

const port = 4444;

http.listen(port, () => {
  console.log('Socket running on 4444;');
});
