// Make connection
var socket = io.connect('http://localhost:4000');



socket.emit('join', {user:2});
// Query DOM
var message = document.getElementById('message'),
      sender = document.getElementById('sender'),
      receiver = document.getElementById('receiver'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('msg', {
        message: message.value,
        sender: sender.value,
        receiver: '1'
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', receiver.value);
})

socket.on("new_msg", function(data) {
    alert(data.msg);
    console.log(data.msg)
})
// Listen for events
socket.on('chat', function(data){

    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.sender + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
