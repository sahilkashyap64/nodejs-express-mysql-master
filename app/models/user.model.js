const sql = require("./db.js");
const Base64 = require("../helpers/base64");
// constructor
const User = function(user) {
  this.name = user.title;
};
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, tutorials, totalPages, currentPage };
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE userid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findFriendById = (id,next_cursor,limit, result) => {
  let cursorId;
  if (next_cursor) {
  
      cursorId = Base64.decode(next_cursor);
      }
      
  limit=+(limit || 50) + 1;
  console.log("limitinmodel",limit);
  let query = `SELECT B.userid,B.name
  FROM
  (
      SELECT userid FROM friends WHERE friendid=${id}
      UNION
      SELECT friendid FROM friends WHERE userid=${id}
  ) A INNER JOIN users B USING (userid) ORDER BY B.userid DESC LIMIT ${limit}`;
  if (cursorId) {
   query = `SELECT B.userid,B.name
   FROM
   (
       SELECT userid FROM friends WHERE friendid=${id}
       UNION
       SELECT friendid FROM friends WHERE userid=${id}
   ) A INNER JOIN users B USING (userid) WHERE B.userid <= ${cursorId} ORDER BY B.userid DESC LIMIT ${limit}`;
  }else{
    console.log("undefined");

  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findFriendofFriendById = (id,next_cursor,limit, result) => {
  let cursorId;
  if (next_cursor) {
  
      cursorId = Base64.decode(next_cursor);
      }
      
  limit=+(limit || 50) + 1;
  console.log("limitinmodel",limit);
  let query = `select f1.friendid as friends_of_friends,u1.name
  from friends f1  JOIN users u1 
  ON f1.userid = u1.userid
  
  where f1.userid in (   /* retrieve my friend list */
        select friendid as my_friends_userId
        from friends f
        where f.userid = ${id}
          )
  and f1.friendid not in (   /* exclusion of my own friends */
        select friendid as my_friends_userId
        from friends f
        where f.userid = ${id}
          
   )
 
  and f1.friendid != ${id}  /* exclusion of myself. */ ORDER BY f1.friendid DESC LIMIT ${limit}`;
  if (cursorId) {
   query = `select f1.friendid as friends_of_friends,u1.name
   from friends f1  JOIN users u1 
   ON f1.userid = u1.userid
   
    where f1.userid in (   /* retrieve my friend list */
         select friendid as my_friends_userId
         from friends f
         where f.userid = ${id}
           )
   and f1.friendid not in (   /* exclusion of my own friends */
         select friendid as my_friends_userId
         from friends f
         where f.userid = ${id}
           
    )
  
   and f1.friendid != ${id}  /* exclusion of myself. */ WHERE f1.friendid <= ${cursorId} ORDER BY f1.friendid DESC LIMIT ${limit}`;
  }else{
    console.log("undefined");

  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findFriendofFriendsbyid = (id, result) => {
  

  sql.query(`select f1.friendid as friends_of_friends
  from friends f1
  where f1.userid in (   /* retrieve my friend list */
        select friendid as my_friends_userId
        from friends f
        where f.userid = ${id}
          )
  and f1.friendid not in (   /* exclusion of my own friends */
        select friendid as my_friends_userId
        from friends f
        where f.userid = ${id}
          
   )
 
  and f1.friendid != ${id}  /* exclusion of myself. */`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title,next_cursor,limit, result) => {
  let cursorId;
  if (next_cursor) {
  
      cursorId = Base64.decode(next_cursor);
      }
      
  limit=+(limit || 50) + 1;
  console.log("limitinmodel",limit);
  
  let query = `SELECT * FROM users ORDER BY userid DESC LIMIT ${limit}`;
  if (cursorId) {
   query = `SELECT * FROM users WHERE userid <= ${cursorId} ORDER BY userid DESC LIMIT ${limit}`;
  }else{
    console.log("undefined");

  }
  if (title) {
    query += ` WHERE name LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;
