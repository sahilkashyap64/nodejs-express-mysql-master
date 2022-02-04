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
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
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

User.getAll = (title,next_cursor,limit, result) => {
  let cursorId;
  if (next_cursor) {
    try {
      let decodedCursor = Base64.decode(next_cursor);
console.log("decodedCursor",decodedCursor);
      cursorId = decodedCursor.split(':')[1];
      console.log("cursorId",cursorId);
    } catch {
      console.log("Errrrororororoororor");
      throw new Error('Invalid cursor');
    }}
  limit=+(limit || 50) + 1;
  console.log("limitinmodel",limit);
  
  let query = `SELECT * FROM users ORDER BY userid DESC LIMIT ${limit}`;
  if (cursorId) {
    console.log("next_cursor being used");
   query = `SELECT * FROM users WHERE userid <= ${cursorId} ORDER BY userid DESC LIMIT ${limit}`;
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
