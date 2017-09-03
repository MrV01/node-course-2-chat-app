
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
