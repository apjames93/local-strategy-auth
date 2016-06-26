var express = require('express');
var router = express.Router();
var db = require('../db/api');
var auth = require('../auth');

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', {id: request.session.userId });
});

//get the home page
router.get('/home', auth.isNotLoggedIn, function(request, response, next){
  db.findUserById(request.session.userId).then(function(user){
    response.render('home', {user: user});
  });
});

//get log in page
router.get('/login', auth.isLoggedIn, function( request, response, next){
  response.render('auth/login');
});
// get sign up page
router.get('/signup', auth.isLoggedIn, function(request, response, next){
  response.render('auth/signup');
});

//post to log in
router.post('/login', function(request, response, next){
  auth.passport.authenticate('local', function(error, user, info){
    if(error){
      response.render('auth/login', {error: error});
    }else if(user){
      request.session.userId= user.id;
      response.redirect('/home');
    }
  })(request, response, next);
});
//post to sign up
router.post('/signup', auth.isLoggedIn, function(request, response, next){
  db.findUserByUserName(request.body.username).then(function(user){
    if(user){
      response.render('auth/signup', {error: "pick another name "});
    }else{
      auth.createUser(request.body).then(function(id){
        request.session.userId = id;
        response.redirect('/home');
      });
    }
  }).catch(function(error){
    next(error);
  });
});

// get logout
router.get('/logout', function(request, response, next){
  request.session = null;
  response.redirect('/');
});



module.exports = router;
