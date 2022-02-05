
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {userid:1,friendid:2},
        {userid:1,friendid:3},
        {userid:2,friendid:1},
        {userid:2,friendid:5},
        {userid:3,friendid:4},
        {userid:5,friendid:2},
        {userid:5,friendid:3}
      ]);
    });
};
