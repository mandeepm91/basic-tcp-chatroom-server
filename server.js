// run the server using `node server.js` command
// connect to the server using `nc <IP address> 8080`

const server = require('net').createServer();

let sockets = {};
let counter = 1;

function timestamp () {
  const now = new Date();
  return `${(now.getMonth()+1)}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}`
}

function allUserNamesString () {
  return Object.keys(sockets).map(key => {
    return sockets[key].name;
  }).join(', ');
}

function printOnlineUsers (socket) {
  socket.write(`Users currently online: ${allUserNamesString()} \n> `);
}

server.on('connection', socket => {
  console.log('new connection');
  socket.id = counter++;
  socket.write('Please enter your name to continue\n> ');
  socket.on('data', (message) => {
    if (!sockets[socket.id]) {
      // user is providing their name
      // trimming is needed to eliminate newline from end

      socket.name = message.toString().trim();
      sockets[socket.id] = socket;
      socket.write(`Welcome ${socket.name}!\n`);
      printOnlineUsers(socket);
      Object.entries(sockets).forEach(([id, cs]) => {
        if (Number(id) !== Number(socket.id)) {
          cs.write(`<${socket.name} just joined! [${timestamp()}]>\n`);
          printOnlineUsers(cs);
        }
      });
      return;
    }
    // user is typing some message
    // broadcast this to all other users except self
    Object.entries(sockets).forEach(([id, cs]) => {
      if (Number(id) !== Number(socket.id)) {
        cs.write(`${socket.name} [${timestamp()}]: ${message}`);
      }
      cs.write('> ');
    });
  });
  socket.on('close', () => {
    console.log(`Connection Closed: ${socket.id}`);
    delete sockets[socket.id];
    Object.entries(sockets).forEach(([id, cs]) => {
      if (Number(id) !== Number(socket.id)) {
        cs.write(`<${socket.name} just left [${timestamp()}]>\n`);
        printOnlineUsers(cs);
      }
    });
  });
});

server.listen(8080, () => {
  console.log('opened server on', server.address());
});
