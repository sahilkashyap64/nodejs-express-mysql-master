const User = require("../models/user.model.js");
const Base64 = require("../helpers/base64");
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  // const next_cursor = Base64.decode(req.query.next_cursor);
  const next_cursor = req.query.next_cursor;
  const limit = req.query.limit;

  User.getAll(title,next_cursor, limit,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    }else { 
       // Calculate next cursor
  let nextCursor = '';
  let nextcursorurl='';

let islimit=(typeof limit == 'undefined' && limit == null)?data.length-1:limit;
  if (data.length > islimit) {
    const lastEle = data.pop();

     nextCursor = Base64.encode(`${lastEle.userid}`);
    nextcursorurl=(req.baseUrl + req.path).replace(/\/$/, "")+"?limit="+islimit+"&next_cursor="+nextCursor;
   
    // nextCursor = lastEle.userid;
  }
      res.status(200).json({
      status: "success",
      msg: "Sucesfully user list fetched",
      limit:islimit,
      length: data?.length,
      data: data,
      next_cursor: nextCursor,
      next_cursor_url: nextcursorurl
    })};
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};



// Find a single User by Id
exports.findFriendofFriendsofUser = (req, res) => {
  User.findFriendofFriendsbyid(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  User.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.findAllFriendsByID = (req, res) => {
  const id = req.params.id;
  // const next_cursor = Base64.decode(req.query.next_cursor);
  const next_cursor = req.query.next_cursor;
  const limit = req.query.limit;

  User.findFriendById(id,next_cursor, limit,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    }else { 
       // Calculate next cursor
  let nextCursor = '';
  let nextcursorurl='';
  console.log("nextCursor limit",limit);
console.log("data.length > limit",data.length > limit);
let islimit=(typeof limit == 'undefined' && limit == null)?data.length-1:limit;
  if (data.length > islimit) {
    const lastEle = data.pop();

    nextCursor = Base64.encode(`${lastEle.userid}`);
    // nextCursor = lastEle.userid;
    nextcursorurl=(req.baseUrl + req.path).replace(/\/$/, "")+"?limit="+islimit+"&next_cursor="+nextCursor;
  }
      res.status(200).json({
      status: "success",
      msg: "Sucesfully user's friend list fetched",
      limit:islimit,
      length: data?.length,
      data: data,
      next_cursor: nextCursor,
      next_cursor_url: nextcursorurl
    })};
  });
};
exports.findAllFriendsofFriendByID = (req, res) => {
  const id = req.params.id;
  // const next_cursor = Base64.decode(req.query.next_cursor);
  const next_cursor = req.query.next_cursor;
  const limit = req.query.limit;

  User.findFriendofFriendById(id,next_cursor, limit,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    }else { 
       // Calculate next cursor
  let nextCursor = '';
  let nextcursorurl='';
  console.log("nextCursor limit",limit);
console.log("data.length > limit",data.length > limit);
let islimit=(typeof limit == 'undefined' && limit == null)?data.length-1:limit;
  if (data.length > islimit) {
    const lastEle = data.pop();

    nextCursor = Base64.encode(`${lastEle.userid}`);
    // nextCursor = lastEle.userid;
    nextcursorurl=(req.baseUrl + req.path).replace(/\/$/, "")+"?limit="+islimit+"&next_cursor="+nextCursor;
  }
      res.status(200).json({
      status: "success",
      msg: "Sucesfully user's friend of friend list fetched",
      limit:islimit,
      length: data?.length,
      data: data,
      next_cursor: nextCursor,
      next_cursor_url: nextcursorurl
    })};
  });
};

