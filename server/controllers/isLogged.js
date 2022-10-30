const db = require("../routes/db-config");
const jwt = require('jsonwebtoken');
//i use this https://www.npmjs.com/package/jsonwebtoken
//is cryptography library for token authentication
//in file .env you find the rules for JWT_SECRET to randomize tokens

const isLogged = (req, res) => {
  if (!req.cookies.logUser) return res.json({ status: 0});
  const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET,
    (err, id) => {
      if (err) return null;
      else return id;
    })
  if (user == null) return res.json({ status: 0})
  
  db.query("SELECT user FROM users WHERE id = ?", [user.id], (err, result) => {
    if (err) throw err;
    return res.json({ status: 1, user: result[0].user });
  });
};
module.exports = isLogged
