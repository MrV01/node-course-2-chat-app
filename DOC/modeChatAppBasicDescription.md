
Created  basic SocketIO connection.   
Email notification workflow. ( 1 - 2 -3)
1.     <->   Socket.io Events For Email App

2.    Server( It emits event)  ->  Client (listen for event)     New Email Event (from, text, createdAt)

3.   Server (Listens for Event )   <-  Client ( emits Event)    createEmail Event ( to, text, schedule TimeStamp)


Challenge to Lecture 107:   To implement Messaging Application Events.   
1.     <->   Socket.io Events For Chat App

2.    Server( It emits event)  ->  Client (listen for event)     newMessage Event (from, text, createdAt)
log ("got new message", {from : , text : , createdAt : })

3. Server (Listens for Event )   <-  Client ( emits Event)    createMessage Event ( from, text )
log("create message", {from : , text : })


Challenge to lecture 109:   To  implement Broadcast application
( Deployed on Heroku  https://polar-depths-68329.herokuapp.com/ )

1.   <->   Socket.io Events For Chat App

2. Server (Listens Connections)  <-  Client ( emits Event).

3.  Upon receiving the connection from the client, server:
      -- Broadcast to all connected clients( including client , opened this connection ).
      -- Broadcast to all connected clients except the one, which open the connection.

      io.on('connection', (socket) => {

          io.emit('newMessage', { // to all
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
          });

           socket.broadcast.emit('newMessage', {
              // to other than itself
              from: message.from,
              text: messge.text,
              createdAt: new Date().getTime()
          });

      }); 
