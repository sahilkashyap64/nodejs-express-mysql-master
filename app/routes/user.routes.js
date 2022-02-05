module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();


  // Retrieve all users
  router.get("/", users.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", users.findOne);
  router.get("/:id/friendlist", users.findFriendofUser);
  router.get("/:id/friendoffriend", users.findFriendofFriendsofUser);

  app.use('/api/users', router);
};
