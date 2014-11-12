module.exports = function(app, passport) {

	// server routes ===========================================================
	
	// handle things like api calls
	// authentication routes

	app.post('/signup',passport.authenticate('local-signup', {
		successRedirect : '/presents',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.post('/login',passport.authenticate('local-login', {
		successRedirect : '/presents',
		failureRedirect : '/login',
		failureFlash : true
	}));

	// frontend routes =========================================================

	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}