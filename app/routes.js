module.exports = function(app, passport) {

  // server routes ===========================================================

  var express = require('express');

  // import mongoose models
  var User = require('./models/user');
  var Present = require('./models/present');


// app.all('/*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//     console.log('in that all function');
//   next();
// });



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
      p.claimedBy = null;
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
        present.published = req.body.published;
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

  presentRouter.route('/claim/:present_id/:user_id')
    .post(function(req, res) {
      Present.findById(req.params.present_id, function(err, present) {
        if (err)
          res.send(err);
        present.claimedBy = req.params.user_id;
        present.save(function(err) {
          if (err)
            res.send(err);
          res.send(present);
        });
      });
    });

  presentRouter.route('/unclaim/:present_id/:user_id')
    .post(function(req, res) {
      Present.findById(req.params.present_id, function(err, present) {
        if (err)
          res.send(err);
        present.claimedBy = null;
        present.save(function(err) {
          if (err)
            res.send(err);
          res.send(present);
        });
      });
    });



  // User Router ========================================

  var userRouter = express.Router();

  userRouter.use(function(req, res, next) {
    console.log('--- User Router');
    next();
  });

  userRouter.route('/')
    .get(function(req, res) {
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
    .get(function(req, res) {
      if (req.user)
        User
        .findById(req.user._id)
        .populate('presents')
        .exec(function(err, user) {
          if (err)
            console.log(err);
          res.json(user);
        });
      else
        res.json({
          message: 'not logged in'
        });
    });

  userRouter.route('/:user_id')
    .get(function(req, res) {
      User
        .findById(req.params.user_id)
        .populate('presents')
        .exec(function(err, user) {
          if (err) console.log(err);
          console.log('user presents: ' + user.presents[0].title);
          res.json(user);
        });
    })
    .put(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          console.log(err);

        console.log('adding pId: ' + req.body.pId);
        user.presents.push(req.body.pId);

        res.send(user);

        user.save(function(err) {
          if (err)
            console.log(err);
          console.log('presents added to user');
        });
      });
    })
    .delete(function(req, res) {
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

    userRouter.route('/notnew/:user_id')
    .post(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          console.log(err);
        user.brandNew = false;
        res.send(user);

        user.save(function(err) {
          if (err)
            console.log(err);
          console.log('user no longer new saved');
        });
      });
    });

    userRouter.route('/name/:user_id')
    .post(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          console.log(err);
        user.name = req.body.name;
        res.send(user);

        user.save(function(err) {
          if (err)
            console.log(err);
          console.log('user no longer new saved');
        });
      });
    });

  userRouter.route('/finalize/:user_id')
    .post(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          console.log(err);

        console.log('finalizing user!');
        user.finalized = true;
        res.send(user);

        user.save(function(err) {
          if (err)
            console.log(err);
          console.log('user finalize saved');
        });
      });
    });

  userRouter.route('/:user_id/presents/:present_id')
    .post(function(req, res) {
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
            user.presents.splice(i, 1);
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

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {

      console.log(info);

      if (err) {
        return next(err);
      }
      if (!user) {
        res.send(info);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.send({
            message: 'signed up'
          });
        });
      }
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err);
      }

      console.log(info);

      if (!user) {
        res.send(info);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.send({
            message: 'logged in'
          });
        });
      }
    })(req, res, next);
  });

  app.get('/hello', isLoggedIn, function(req, res) {
    res.send(req.user);
    console.log('user is logged in!');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // middleware for accessing a specific user's list. 
  // will be fleshing out finalized list, including logic for who is accessing the page
  app.get('/list/:user_id', function(req, res, next) {
    console.log('attempting to access user list');

    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        console.log(err);
        res.redirect('/noUser');
      } else {

        // need logic here to determine if someone is trying to access his own list
        // as well as if the user exists but hasn't yet finalized his list
        // if i'm accessing myself, bring me to my list

        console.log(user);


        if (user.finalized === false) {
          console.log('++++++++++ user exists but not finalized ');
          res.redirect('/');
        } else {
          return next();
        }
      }
    });

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





