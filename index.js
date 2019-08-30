var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});



// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

     socket.on('join', function (data) {
        console.log("join called"+data.user)
     socket.join(data.user); // We are using room of socket io
   });


     socket.on('msg',function(data){
         io.sockets.in(data.receiver).emit('new_msg', {msg: data.message,sender: data.sender});

     })

     // Handle typing event
    socket.on('typing', function(data){
        io.sockets.in(data.receiver).emit('typing', data.sender);
        // socket.broadcast.emit('typing', data.sender);
    });

    



    console.log('made socket connection', socket.id);

    // Handle chat event
    // socket.on('chat', function(data){
      
    //     io.sockets.emit('chat', data);
    // });

    

    socket.on('notificationAct', function(data){

    })

});
