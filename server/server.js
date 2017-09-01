/////  Set up Chat Application
/// Run:  nodemon  server/server.js
///
/////////////////// Dependencies.
//  npm Express:  npm i express@4.15.4 --save
//  npm morgan:  npm  i  morgan@1.8.2 --save   // HTTP logger
//  SocketIO      :  npm i   socket.io@2.0.3 --save  // real-time  bidirectional event-based communication
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
function logSock(desc, socket) {
  console.log(desc, socket.handshake.time,
                    socket.handshake.headers.referer,
                    socket.handshake.address,
                    socket.handshake.query);
};
io.on('connection', (socket) => {  // Particular client connection opens.
    logSock('New user connected. using WebSocket.IO proto',socket);
    socket.on('disconnect', (socket) => {
      console.log("Disconnected from server Socket.IO",socket);
    });
});

server.listen(port , () => {     // http module replaces Express JS here.
  console.log(`App is listening on port: ${port}`);
});
