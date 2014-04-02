var tweetStream = require('./twitter-listener')
  , app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

io.set('log level', 1);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

tweetStream.stream({
  'track': 'twitter'
}).on('data', function(data){
  io.sockets.emit('tweet',data.toString());
})
