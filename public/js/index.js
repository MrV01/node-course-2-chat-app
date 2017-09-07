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

/////// Custom event listener  on the client (browser) side.
socket.on('newLocationMessage', function(message) {
    console.log('newLocationMessage', message);
    var li = jQuery('<li></li>');
    // !Eurica! Ancor tag for the URL required for clicking
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);   // to prevent code injection
    li.append(a);
    jQuery('#messages').append(li);
});

// Custom Event Emitter with Acknolegement to the client via callback function.
function sendChatMessage( fromName, messageText, callback) {
        socket.emit('createMessage', {
             from: fromName,
             text: messageText
        }, function (data) { // get some data from server back.
            if(callback) { callback( data); }
        });
}
//
sendChatMessage("Freddy", "Good Day, I am Freddy. How are you?");

////////////////////////////////////////////////////////////////////////////////////////////
/// Message form , Geolocation  lectures.
/////////////////////////////////////////////////////////////////////////////////////////////
///  "Send Message"  JQuery Event handler ( message form lession)

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
        sendChatMessage(name, values.message, function() {
        // clean message field in the form
        jQuery('[name=message]').val('');
      });
    }

});

/////////////////////////////////////////////////////////////////////////////////
/// How to volunary Share geolocation
////////////////////////////////////////////////////////////////////////////////
// 1. Add buttton  id="send location" in .html file
// 2. Create event handler .on(click, ) in index.js  and handler in server.js on the server side.
// 3. Server broadcasts  io.emit('newMessage', textString) to all connected clients
///      Geolocation PART 2:
///  4.  Instead of sharing pair of coordinates,  send to clients link to
///       a google maps.
///      Modification of  server.js  to emit  newLocationMessage in response
///       to createLocationMessage event-request,  and
///       in index.js  add handler.  on.('newLocationMessage', ...) ) to broadcast location
///

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  // Check if geolocation is available in the browser.
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by you browser.');
  }
  // disable button in DOM during processing of navigator.geolocation.getCurrentPosition() call
  locationButton.attr('disabled', 'disabled').text('Sending location ...');  //  jQuery adds  "disabled : disabled" attr
              /// to the element of the DOM (button), And changing enscrition on the button.
  // Get browser's current position and send request 'createLocationMessage'
  /// for broadcast to others.
  ///
  navigator.geolocation.getCurrentPosition( function (position){
    locationButton.removeAttr('disabled').text('Send location');  // jQuery method removes attribute
      console.log("Current geolocation object  : ", position);
      socket.emit('createLocationMessage', { // send the message to server
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function (data) { // get back data from server.
          console.log('Got it : ', data);
      });
  }, function () { // error during navigator.geolocation request.
      locationButton.removeAttr('disabled').text('Send location');
       // jQuery method removes "disabled" attribute, AND restores the enscryption.
      alert("Not able to fetch current location.");
  });

});
