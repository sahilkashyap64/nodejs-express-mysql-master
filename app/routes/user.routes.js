module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();


  // Retrieve all users
  router.get("/", users.findAll);


  app.use('/api/users', router);
};
