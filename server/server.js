/////  Set up Chat Application
/// Uses Socket.IO library:  https://socket.io/docs/rooms-and-namespaces/
/// SocketIO servers can be communcated from non-socket.io processes
///  with help of socket.io-emitter: https://github.com/socketio/socket.io-emitter
///  Multiple nodes adapter:  https://github.com/socketio/socket.io-redis
///  By running socket.io with the socket.io-redis adapter you can run multiple socket.io instances in different processes or servers that can all broadcast and emit events to and from each other.
/// Run:  nodemon  server/server.js
/// O HEROKY:
///    https://polar-depths-68329.herokuapp.com/
/////////////////// Dependencies.
//  npm Express:  npm i express@4.15.4 --save
//  npm morgan:  npm  i  morgan@1.8.2 --save   // HTTP logger
//  SocketIO      :  npm i   socket.io@2.0.3 --save  // real-time  bidirectional event-based communication
//  Unit testing of the node-chat-app
// npm install expect@1.20.2 mocha@3.1.2 --save-dev
// Local recent nodemon:
//   !!!! Does not work on Windows nvm :  npm install nodemon@1.11.0  --save-dev
//
//// Challenge 1. ( DONE successfully )
////  1. Configure brand new Express application.
////   2. Set up static middleware to serve public folder with index.html
////   3. start application  on localhost:3000
////
///  Used  http://hectorcorrea.com/blog/introduction-to-node-js/51 as a template
///  Docs: https://expressjs.com/en/starter/static-files.html
/// NOTE:  console.log(__dirname + './../public');  // Old way to do things, is not used now.
///
// New way to do things:  path.join()   from https://nodejs.org/api/path.html
const path = require('path');  // internal Node module
const http = require('http'); // internal Node module
const publicPath = path.join(__dirname, '../public');  // runs in server folder
const port = process.env.PORT || 3000;
//  console.log(publicPath);
const express = require('express');
const logger = require('morgan');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');

var app = express();    // configure it below
// Socket.IO   requires embedded http module .
var server = http.createServer(app);
var io = socketIO(server);   //  Socket IO integrated to HTTP server
// Now couple of perks are available:
// 1. Emitting and listening to events with the client.
//      Access to the route which assepts incoming connections.
// 2. Library for a client to make a connection
//      and transfer data:  localhost:3000/socket.io/socket.io.js
// DOCs available: https://socket.io/docs/
//
app.use(logger('dev'));   // argument: 'combined' in production
// Serve static files from   public directory, using express.static middleware.
app.use(express.static(publicPath));
/// Or with "mount point" (/static dirextory here):
///                app.use('/static', express.static(path.join(__dirname, 'public')))
//// For one file index.html, (one file per route only) use folllowing:
////  res.sendFile(path.join( publicPath + '/index.html'));
// Route for everything else
app.get('*', function(req, res) {
  res.status(404).sendFile(publicPath + '/404page.html');
});

// WebSocket creates persistant client/server connection.
// Both client and server are trying to reconnect when unreachable to each other
// New individual connection event, one of the all users, connected to the server
//// https://socket.io/docs/server-api/
//
// Helper logSock function
function logSock(desc, socket) {
  console.log(desc, socket.handshake.time,
                    socket.handshake.headers.referer,
                    socket.handshake.address,
                    socket.handshake.query);
};

// Socket.IO standard connection listener
io.on('connection', (socket) => {  // Particular client connection opens.
    logSock('New user connected.WebSocket.IO proto', socket);
// Handler of join user and a chat room
socket.on('join', (params, callback) => {
   // Validate name and room
    if(!isRealString(params.name) || !isRealString(params.room) ) {
        callback('Required: name and room.');  // error
    };
    ///////
    /////// THE name and room has been validated successfully, now start using them
    //////  https://socket.io/docs/rooms-and-namespaces/
    socket.join(params.room) ; // socket assigned to  particular room
    // socket.leave('The office fans');  // Leave 'The office fans' chat room call
    ///////////////// Legend of the no room to named room code conversion
    // No Rooms (default room) version  -> Join Room ( named room) version
    // io.emit   ->  io.to('room name').emit
    // socket.broadcast.emit -> socket.broadcast.to('room name').emit
    // socket.emit  ->  socket.emit  ( because  one to one connection used in one room only)

    /// 1. socket.emit (server to client) from: Admin  text: Welcome to the one connected chat app
    socket.emit('newMessage', generateMessage( 'Admin', `Welcome to the chat App, User ${params.name} Room ${params.room}`) );
    /// 2. socket.broadcast.to('room name').emit   From:  Admin  text: New user joined
    // socket.broadcast.emit() method broadcast messages to "other" connected clients
    socket.broadcast.to(params.room).emit('newMessage', generateMessage( 'Admin', ` ${params.name} user joined room: ${params.room}`));

    callback(); // OK, no error happened during joining the room
});


    //////////////////////////////////////////////////////////////////////
    // new createMessage custom event  listener
    //////////////////////////////////////////////////////////////////////

    socket.on('createMessage', (message, callback) => {
      console.log('createMessage received : ', message);
      // Section9 . Lecture 109.  Also broadcast message to connected clients.
       // io.emit() method broadcast messages to all connected clients
       io.emit('newMessage', generateMessage(message.from, message.text));
       // Lecture 111. Acknolegement callback to the client.
       callback('ACK from the server: createMessage');  // acknolegement to the client
    });


    //////////////////////////////////////////////////////////////
    /// Share location message to the clients
    //////////////////////////////////////////////////////////////

    socket.on('createLocationMessage', (coords,callback) => {
      console.log('createLocationMessage received : ', coords);
      io.emit('newLocationMessage',
          generateLocationMessage(coords.from, coords.latitude , coords.longitude));
      callback('ACK from the server: createLocationMessage');
    });

    //////////////////////////////////////////////////////////////////////
    // Standard  socketIO  client "disconnect" event listener
    ///////////////////////////////////////////////////////////////////////
    socket.on('disconnect', (socket) => {
      console.log("Disconnected from server Socket.IO",socket);
    });

});   //// IO on  'connection'.

///////////////////////////////////////////////////////////////////////////////////////////////
/// Server  start listening on the predefined port
///
server.listen(port , () => {     // http module replaces Express JS here.
  console.log(`App is listening on port: ${port}`);
});
