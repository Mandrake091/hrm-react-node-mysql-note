const bcrypt = require("bcryptjs");
const db = require("../routes/db-config");
const register = async (req, res) => {
  const { user, pass: rawPsw } = req.body;
  db.query(
    "SELECT user FROM users WHERE user = ?",
    [user],
    async (stop, check) => {
      if (stop) throw stop;
      if (check[0])
        return res.json({ status: 0, message: "User already exists" 
      });

      const pass = await bcrypt.hash(rawPsw, 10)
      db.query("INSERT INTO users set ?", { user, pass }, (err, result) => {
        if (err) throw err;
        return res.json({ status: 1, message: "User registered" });
      });   
  });
};
module.exports = register;