var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var packageDetails  = require('./package.json');
var redis           = require('redis');
var bluebird        = require('bluebird');

var Model           = require('./app/models/model');
var User            = require('./app/models/User/user');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port      = process.env.PORT || 8080;
var rPort = 6379;
var rClient   = redis.createClient(rPort, "127.0.0.1");

var user = new User(rClient);

rClient.hmset('catstagram', {
  "version": packageDetails.version,
  "developer": packageDetails.author
});

//Routing for app.
var router = express.Router();

router.get('/', function(request, response) {
  response.json({message: "Catstagram API Version "+packageDetails.version});
});

router.get("/getRedis", function(request, response){
  rClient.hgetall('catstagram', function(err, object) {
    response.json({message: object});
  });
});

// USER ROUTES
router.get("/users/all", function(request, response) {

});

router.post("/users", function(request, response) {
  if(request.body.email && request.body.username && request.body.password){
    user.registerUser(request.body.email, request.body.username, request.body.password).then(resp => {
      response.json({message: resp});
    });
  }
  else {
    response.json({message: "Please supply username, email and password.", error: 1});
  }
})

router.get("/user/:username", function(request, response) {
  user.findUser(request.params.username).then(resp => {
    response.json({user: resp});
  });
});

router.post("/user/login", function(request, response) {
  if(request.body.username && request.body.password) {
    user.login(request.body.username, request.body.password).then(resp => {
      response.json({loggedin: resp, username: request.body.username});
    });
  } else {
    response.json({message: "Please supply username and password", error: 1});
  }
});

//Send routers on /api to router
app.use('/api', router);

app.listen(port);
console.log("Starting server on port %s, Catstagram API Version %s", port, packageDetails.version);
