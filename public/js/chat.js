//
// JS code For the client side of node-chat-app
/////
/////  Parent HTML page chat.html is opened
/////  from a form in index.html with following parameters:
/////    chat.html?name=Vlad&room=1
/////    ( GET request: name=<name> room=<room>)
/////   Join-Event should  handle new user, and assagn the proper "room" to the user.
////    the name and room are located in BOM object  "window.location.search"
/////    which has a value: "?name=www&room=e"
////      Using  third party .deparam() to convert search string back to the object.
/////        https://github.com/AceMetrix/jquery-deparam
/////       ( jQuery does not include .deparam method. It does after adding jquery-deparam script. ).
////        jQuery.deparam(window.location.search.split('?').length>0?[1]:[0];
//////////////////////////////////////////////////////////////////////////////////////////////////
// Get the page's  parameters.  Fixes extra ? issue.
function getPageParams() {
   var parr = window.location.search.split('?');
   if(parr.length > 1) parr.shift(); // remove first part before "?"
   return jQuery.deparam(parr[0]);
}
///  Introducing teemplate engine moustach,js ( https://github.com/janl/mustache.js/ )
///  to handle DOM messages rendering tasks.  Added to chat.html  file.
//////
var socket = io();  // initiate  Socket.IO  from client to the web host.

/////// Called every time new message added to the "messages" area
///////  to automatically scroll down list of messages and display the new one.
//////  Depending on position of vertical SCROLLBAR of the element.
/////  responsive solution, because takes vertical size of the window into account
function scrollToBottom () {
    // scrollHeight   ( scrollTop + clientHeight + message height)
    // scrollTop     ( From the  scroll window  upper border to upper border of the vertical SCROLLBAR)
    // clientHeight  ( vertical size of the scroll window in pixels)
    // message height ( new message height  in pixels )

  /// Selectors 1. Messages area:
  var messages = jQuery('#messages');
  /// Selectors 2. new message is last child fo the messages list.
  var newMessage = messages.children('li:last-child');  // last member of the list
  /// Heights ( supplies by jQuery object in pixels)
  var clientHeight = messages.prop('clientHeight');  // jQuery function : http://api.jquery.com/prop/
  var scrollTop = messages.prop('scrollTop') ;
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();  // message height including padding
  var lastMessageHeight = newMessage.prev().innerHeight(); // message height(and padding) of the last message.

  if( clientHeight + scrollTop  + newMessageHeight + lastMessageHeight >= scrollHeight ) {  // scroll to bottom
    console.log(`SCROLL: ${clientHeight + scrollTop  + newMessageHeight + lastMessageHeight} >= ${scrollHeight}  where scroll  ${scrollHeight} client:${clientHeight} top:${scrollTop} new:${newMessageHeight} last:${lastMessageHeight}`);
    messages.scrollTop(scrollHeight);  // jQuery method https://api.jquery.com/scrollTop/
                  /////  scrollHeight indicating the new position to set the scroll bar to.
  } else {
     console.log(`NOT scroll: ${clientHeight + scrollTop  + newMessageHeight + lastMessageHeight} >= ${scrollHeight} where scroll  ${scrollHeight} client:${clientHeight} top:${scrollTop} new:${newMessageHeight} last:${lastMessageHeight} `);
  }

};

// Supposed to work in ES5 browsers, therefore funtion(){} instead of () => {}
// Listens for embedded/internal SocketIO events:  connect, disconnect
socket.on('connect', function() {
    var params = getPageParams();
    console.log("Connected Socket.IO server. Joining as: ", params);
    // Embedded  Socket.IO event.  Join-Event:
    socket.emit('join',  params, function (err) {
      if(err) {  // send user back to login page (index.html)
        alert(err);
        window.location.href = '/';
      } else {
        console.log('No error. validation passed');
      };
    });

});

/////// Standard Server Disconnect action
socket.on('disconnect', function() {
  console.log("Disconnected from server Socket.IO");
});

///// Update user list event . ( regarding displaying list of people on the left pane of window)
 socket.on('updateUserList', function (users) {
    console.log('Users list:', users);
    // Create ordered list element
    var ol = jQuery('<ol></ol>');
    // Put user names to the list element
    users.forEach( function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    // Attach list element to the DOM
    // <div class="chat__sidebar">
    //   <h3>People</h3>
    //   <div id="users"></div>
    // </div>
    jQuery('#users').html(ol);
 });

////// Custom event listener newMessage
socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template =  jQuery('#message-template').html();  // template in index.html
  var  html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt : formattedTime
  });  // convert template to html, displaying properties.
  jQuery('#messages').append(html);   // attach HTML to the list of messages
  scrollToBottom();
});

/////// Custom event listener  on the client (browser) side.
socket.on('newLocationMessage', function(message) {
    // Challenge to display index.html template (id="location-message-template" type="text/template")
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template =  jQuery('#location-message-template').html();  // template in index.html
    var  html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt : formattedTime
    });  // convert template to html, displaying properties.
    jQuery('#messages').append(html);   // attach HTML to the list of messages
    scrollToBottom();

    //////////////// jQuery - DOM manipulation version (difficult to maintain and debug :-) )
    // console.log('newLocationMessage', message);
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // // !Eurica! Ancor tag for the URL required for clicking
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);   // to prevent code injection
    // li.append(a);
    // jQuery('#messages').append(li);
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

/// sendChatMessage("Freddy", "Good Day, I am Freddy. How are you?");

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
    if(values.submit) {
        var name = getPageParams().name;
        sendChatMessage(name, values.message, function() {
            // clean message field in the form when sent.
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
       from:  getPageParams().name,
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
