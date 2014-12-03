module.exports = function(app, passport) {

  // server routes ===========================================================

  var express = require('express');

  // import mongoose models
  var User = require('./models/user');
  var Present = require('./models/present');
  


  // Present Router ===========================================

  var presentRouter = express.Router();

  presentRouter.use(function(req, res, next) {
    console.log('--- Present Router');
    next();
  });

  presentRouter.route('/')
    .get(function(req, res) {
      Present.find(function(err, presents) {
        if (err)
          res.send(err);
        res.json(presents);
      });
    })
    .post(function(req, res) {
      var p = new Present();
      p.title = req.body.title;
      p.notes = req.body.notes;
      p.link = req.body.link;
      p.save(function(err) {
        if (err)
          res.send(err);
        res.json(p);
      });
    });

  presentRouter.route('/:present_id')
    .post(function(req, res) {
      Present.findById(req.params.present_id, function(err, present) {
        if (err) res.send(err);
        present.title = req.body.title;
        present.notes = req.body.notes;
        present.link = req.body.link;
        present.index = req.body.index;
        present.save(function(err) {
          if (err) res.send(err);
          res.json({
            message: 'present updated!'
          });
        });
      });
    })
    .delete(function(req, res) {
      Present.remove({
        _id: req.params.present_id
      }, function(err, present) {
        if (err)
          res.send(err);
        res.json({
          message: 'present successfully deleted'
        });
      });
    });


  // User Router ========================================

  var userRouter = express.Router();

  userRouter.use(function(req,res,next){
  	console.log('--- User Router');
  	next();
  });

  userRouter.route('/')
  	.get(function(req,res){
  		User
      .find()
      .populate('presents')
      .exec(function(err, users) {
        if (err)
          res.send(err);
        res.json(users);
      });
  	});

  userRouter.route('/active')
    .get(function(req,res) {
        if (req.user)
          User
            .findById(req.user._id)
            .populate('presents')
            .exec(function(err,user) {
            if (err)
              console.log(err);
            res.json(user);
          });
        else
          res.json({message: 'not logged in'});
    });

 	userRouter.route('/:user_id')
 		.get(function(req,res){
 			User
      .findById(req.params.user_id)
      .populate('presents')
      .exec(function(err, user) {
        if (err) console.log(err);
        console.log('user presents: ' + user.presents[0].title);
        res.json(user);
      });
 		})
 		.put(function(req,res){
 			User.findById(req.params.user_id, function(err, user) {
        if (err)
          console.log(err);

        console.log('adding pId: ' + req.body.pId);
        user.presents.push(req.body.pId);

        user.save(function(err) {
          if (err)
            console.log(err);
          console.log('presents added to user');
        });
      });
 		})
 		.delete(function(req,res){
 			User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({
        message: 'user successfully deleted'
      });
    });
 		});

  userRouter.route('/:user_id/presents/:present_id')
    .post(function(req,res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          console.log(err);
        console.log('deleting present:' + req.params.present_id);
        console.log('user.presents.length = ' + user.presents.length);
        var i = 0;
        while (i < user.presents.length) {
          console.log(user.presents[i]);
          if (user.presents[i] == req.params.present_id) {
            console.log('found that fucker');
            user.presents.splice(i,1);
          }
          i++;
        }

        user.save(function(err) {
          if (err)
            console.log(err);
          console.log('present successfully deleted from user');
        });

      });
    });

  app.get('/checklogin', function(req, res) {
    if (req.user)
      res.send(true);
    else
      res.send(false);
  });

  app.use('/api/users', userRouter);
  app.use('/api/presents', presentRouter);


  // Passport Shit ======================================

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/presents',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/presents',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/hello', isLoggedIn, function(req, res) {
    res.send(req.user);
    console.log('user is logged in!');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
  
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
  console.log('not logged in');
  res.redirect('/');
}
