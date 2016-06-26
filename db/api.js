var knex = require('./knex');

module.exports= {
//make function to find the user by user id
  findUserById: function(id){
    //finding the id that matches our users id
    return knex('users').select().where({id : id}).first();
  },
  findUserByUserName: function(username){
    return knex('users').select().where({username: username}).first();
  },

  addUser: function(body){
    // adding a new user to the database
    return knex('users').insert(body, 'id');
  }

};
