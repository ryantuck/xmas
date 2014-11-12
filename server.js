// server.js

// modules =================================================
var express 				= require('express');
var app 						= express();

var mongoose 				= require('mongoose');
var bodyParser 			= require('body-parser');
var methodOverride 	= require('method-override');
var passport 				= require('passport');
var flash 					= require('connect-flash');
var morgan 					= require('morgan');
var cookieParser 		= require('cookie-parser');
var session 				= require('express-session');
var db 							= require('./config/db');

// configuration ===========================================

// connect mongoose to my database
mongoose.connect(db.url);

// import mongoose models
var Bear 		= require('./app/models/bear');
var User 		= require('./app/models/user');
var Present = require('./app/models/present');

// set port
var port = process.env.PORT || 8080;

// configure passport by passing it into the config file
require('./config/passport')(passport);

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
  extended: true
})); // parse application/x-www-form-urlencoded


app.use(morgan('dev')); 	// outputs http activity in terminal
app.use(cookieParser()); 	// read cookies (needed for auth)

// passport stuff
app.use(session({
  secret: 'wildwildwest',
  saveUninitialized: true,
  resave: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // for flash messages stored in session


app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


// api routes ==============================================


var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // log something
  console.log('something is happening!');
  next(); // goes to next route (doesn't stop here)
});

// tests route to make sure things are working
router.get('/', function(req, res) {
  res.json({
    message: 'hey welcome to the api'
  });
});

router.route('/bears')

// create a bear
.post(function(req, res) {
  var bear = new Bear();
  bear.name = req.body.name;

  bear.save(function(err) {
    if (err) res.send(err);
    res.json({
      message: 'bear created!'
    });
  });
})

// get all bears
.get(function(req, res) {
  Bear.find(function(err, bears) {
    if (err) res.send(err);
    res.json(bears);
  });
});

router.route('/bears/:bear_id')

// get a bear with a certain id
.get(function(req, res) {
  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err) res.send(err);
    res.json(bear);
  });
})

.put(function(req, res) {
  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err) res.send(err);
    bear.name = req.body.name;
    bear.save(function(err) {
      if (err) res.send(err);
      res.json({
        message: 'bear updated!'
      });
    });
  });
})

.delete(function(req, res) {
  Bear.remove({
    _id: req.params.bear_id
  }, function(err, bear) {
    if (err) res.send(err);
    res.json({
      message: 'bear successfully deleted'
    });
  });
});




// users/presents api stuff
app.get('/api/presents', function(req,res) {
	Present.find(function(err,presents) {
		if (err)
			res.send(err);
		res.json(presents);
	});
});

app.get('/api/users', function(req,res) {
	User.find(function(err,users) {
		if (err)
			res.send(err);
		res.json(users);
	});
});

app.post('/api/presents', function(req,res) {
	var p = new Present();
	p.title = req.body.title;
	p.notes = req.body.notes;
	p.link = req.body.link;
	p.save(function(err){
		if (err)
			res.send(err);
		res.json({
			message: 'present created!'
		});
	});
});








// registers routes
app.use('/api', router);


// routes ==================================================
require('./app/routes')(app, passport); // pass our application into our routes



// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
