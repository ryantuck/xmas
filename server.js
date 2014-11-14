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

// routes ==================================================
require('./app/routes')(app, passport); // pass our application into our routes



// start app ===============================================
app.listen(port);
console.log('\n\n\n\n');
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
