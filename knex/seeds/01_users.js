
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      console.log("country inserted");
      return knex('users').insert([
        {userid:1,name: 'india'},
        {userid:2, name:'bhutan'},
        {userid:3, name:'nepal'},
        {userid:4, name:'pakistan'},
        {userid:5, name:'russia'}
      ]);
    });
};
