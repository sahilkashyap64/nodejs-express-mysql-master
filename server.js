const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const knex = require('./knex/knex.js');
const userroutes=require("./app/routes/user.routes.js");
const app = express();
const path = require('path');

var corsOptions = {
  // origin: "http://127.0.0.1:5500"
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});
// simple route
app.get('/friends', function(req, res) {
  res.sendFile(path.join(__dirname, '/friends.html'));
});
// simple route
app.get('/fof', function(req, res) {
  res.sendFile(path.join(__dirname, '/friendofriend.html'));
});

async function assertDatabaseConnection() {
  return knex.raw('select 1+1 as result')
      .catch((err) => {
          console.log('[Fatal]  Failed to establish connection to database! Exiting...');
          console.log(err);
          process.exit(1);
      });
}
assertDatabaseConnection();
userroutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
