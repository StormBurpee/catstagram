var redisServer = require('redis-server');
var server      = new redisServer(6379);

server.open((err => {
  if(err === null) {
    console.log("Redis Server Started on port 6379")
  }
}))
