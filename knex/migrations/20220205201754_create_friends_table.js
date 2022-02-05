exports.up = function(knex, Promise) {
    return knex.schema.createTable('friends', function(table) {
        table.integer('userid').unsigned().notNullable().references('userid').inTable('users').onDelete('cascade');
        table.integer('friendid').unsigned().notNullable().references('userid').inTable('users').onDelete('cascade');
    
     
      table.primary(['userid', 'friendid']);
      table.unique(['friendid', 'userid']);
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('friends');
  }