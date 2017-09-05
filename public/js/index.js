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
  // Add message to the DOM  <ol id="messages"></ol>
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});

// Custom Event Emitter with Acknolegement to the client via callback function.
function sendChatMessage( fromName, messageText) {
        socket.emit('createMessage', {
             from: fromName,
             text: messageText
        }, function (data) { // get some data from server back.
            console.log('Got it :', data);
            return data;
        });
}
//
sendChatMessage("Freddy", "Good Day, I am Freddy. How are you?");

///  JQuery Event handlers

jQuery('#message-form').on('submit', function (ev) {

  ev.preventDefault();   // JQuery to disable default form behavior
  // get all the inputs into an array.
   var $inputs = $('#message-form :input');
   var values = {};
   $inputs.each(function() {
       values[this.name] = $(this).val();
    });
    // Send message if Any
    var name = "Freddy " + location.host;
    if(values.submit) {
      sendChatMessage(name, values.message);
    }

} );
