// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 const dbConfig = require("./app/config/db.config");

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : dbConfig.HOST,
      port : 3306,
      user : dbConfig.USER,
      password : dbConfig.PASSWORD,
      database : dbConfig.DB
    },migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },

  
};
