const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http)


app.use(express.static(__dirname + '/static/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/summary.html', function(req, res){
    res.sendFile(__dirname + '/summary.html');
});

let total = 0;

io.on('connection', function(socket){
    console.log('a user connected');
    setTimeout(function() {
        console.log("emit");
        io.emit('sum message', total)
    }, 100);
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('like message', function(){
        total++;
        io.emit('sum message', total);
        console.log('like from: ' + socket.id);
    });
});

http.listen(3000, function(){
    console.log('Example app listening on port 3000!')
})

