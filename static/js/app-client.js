const socket = io();

$(function() {
    $('#likeButton').on('click', _.throttle(function(){
        socket.emit('like message', "ID");
        console.log('button pushed');
        return false;
    }, 1000));
    socket.on('sum message', function(sum){
        $('#sumLabel').text(sum);
    });
});

