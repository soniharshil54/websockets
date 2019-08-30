// Make connection
var socket = io.connect('http://localhost:4000');

var parseQueryString = function() {

    var str = window.location.search;
    var objURL = {};

    str.replace(
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ),
        function( $0, $1, $2, $3 ){
            objURL[ $1 ] = $3;
        }
    );
    console.log(objURL["u"])
    return objURL["u"];
};

var user =  parseQueryString();
console.log(user)




socket.emit('join', {user:user});
// Query DOM
var message = document.getElementById('message'),
     
      receiver = document.getElementById('receiver'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('msg', {
        message: message.value,
         sender: user,
        receiver: receiver.value
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', {
      sender:user,
      receiver: receiver.value
    });
})

socket.on("new_msg", function(data) {
   feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.msg + '</p>';
    
})
// Listen for events
socket.on('msg', function(data){

   
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
