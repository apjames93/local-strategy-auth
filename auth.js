var db = require('./db/api');
var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy= require('passport-local');

passport.use(new LocalStrategy(function(username, password, done){
  db.findUserByUserName(username).then(function(user){
    if(!user){
      done('error, user does not exist', null);
    }else if(user && bcrypt.compareSync(password, user.password)){
      done(null, user);
    }else{
      done('wrong password', null);
    }
  });
}));





module.exports = {

//passport to passport to use later
  passport: passport,

  createUser: function(body){
    //hash  the password
    var hash = bcrypt.hashSync(body.password, 8);
    body.password = hash;
    return db.addUser(body).then(function(id){
      return id[0];
    });
  },
  isLoggedIn: function(request, response, next ){
    if(request.session.userId){
      response.redirect('/home');
    }else{
     next();
    }
  },
  isNotLoggedIn: function(request, response, next){
    if(!request.session.userId){
      response.redirect('/');
    }else{
      next();
    }
  }
};
