//
// JS code For the client side of node-chat-app
//
var socket = io();  // initiate  Socket  from client to the web host.

// Supposed to work in ES5 browsers, therefore funtion(){} instead of () => {}
// Listens for embedded/internal SocketIO events:  connect, disconnect
socket.on('connect', function() {
    console.log("Connected to server over Socket.IO");
    //  Emit custom createEmail event after connection established
    socket.emit('createEmail', {
      to: 'jenny@example.com',
      text: 'Hey, this is Bob. How are you?'
    });
    // Emit custom event createMessage
    socket.emit('createMessage', {
         from : "BubblesBubbles2" ,
         text : "Doing rather well, cheers"
    });
});
// Custom event  listener newEmail
socket.on('newEmail', function(email) {
  console.log('New Email accepted: ', email);
});

// Custom event listener newMessage
socket.on('newMessage', function(message) {
  console.log('New Message accepted: ', message);
});

/////// Standard Server Disconnect action
socket.on('disconnect', function() {
  console.log("Disconnected from server Socket.IO");
});
