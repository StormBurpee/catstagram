var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var packageDetails  = require('./package.json');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//Routing for app.
var router = express.Router();

router.get('/', function(request, response) {
  response.json({message: "Catstagram API Version "+packageDetails.version});
});

//Send routers on /api to router
app.use('/api', router);

app.listen(port);
console.log("Starting server on port %s, Catstagram API Version %s", port, packageDetails.version);
