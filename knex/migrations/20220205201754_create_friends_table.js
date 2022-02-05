exports.up = function(knex, Promise) {
    return knex.schema.createTable('friends', function(table) {
        table.integer('userid').unsigned().nullable().references('userid').inTable('users');
    table.integer('friendid').unsigned().nullable().references('userid').inTable('users');
     
      table.primary(['userid', 'friendid']);
      table.unique(['friendid', 'userid']);
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('friends');
  }