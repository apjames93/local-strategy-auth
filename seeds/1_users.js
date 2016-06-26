
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({ username: 'alex',password: 'alex'}),
        knex('users').insert({ username:  'dan', password: 'dan'}),
        knex('users').insert({ username: 'brad', password:'brad'})
      ]);
    });
};
