var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var packageDetails  = require('./package.json');
var redis           = require('redis');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port      = process.env.PORT || 8080;
var rPort = 6379;
var rClient   = redis.createClient(rPort, "127.0.0.1");

//Routing for app.
var router = express.Router();

router.get('/', function(request, response) {
  response.json({message: "Catstagram API Version "+packageDetails.version});
});

router.get('/setupRedis', function(request, response) {
  rClient.hmset('catstagram', {
    "version": packageDetails.version,
    "developer": packageDetails.author
  });
  response.json({message: "Successfuly setup Redis"});
});

router.get('/checkRedis', function(request, response) {
    /*rClient.exists('catstagram', function(error, reply) {
      if(reply == 1)
        response.json({message: "Catstagram Database Exists"});
      else
        response.json({message: "Catstagram Database Doesn't Exist"});
    });*/
});

router.get("/getRedis", function(request, response){
  rClient.hgetall('catstagram', function(err, object) {
    response.json({message: object});
  });
});

//Send routers on /api to router
app.use('/api', router);

app.listen(port);
console.log("Starting server on port %s, Catstagram API Version %s", port, packageDetails.version);
