//
// JS code For the client side of node-chat-app
//
var socket = io();  // initiate  Socket  from client to the web host.

// Supposed to work in ES5 browsers, therefore funtion(){} instead of () => {}
// Listens for embedded/internal SocketIO events:  connect, disconnect
socket.on('connect', function() {
    console.log("Connected to server over Socket.IO");

});

/////// Standard Server Disconnect action
socket.on('disconnect', function() {
  console.log("Disconnected from server Socket.IO");
});

// Custom event listener newMessage
socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});

// Custom Event Emitter with Acknolegement to the client via callback function.
socket.emit('createMessage', {
   from: 'Frank',
   text: 'Hi I am Frank'
}, function (data) { // got some data from server back.
  console.log('Got it :', data);
});
