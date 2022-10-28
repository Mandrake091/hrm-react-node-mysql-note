const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../routes/db-config");

const login = async (req, res) => {
  const { user, pass } = req.body;

  db.query(
    "SELECT * FROM users WHERE user = ?",
    [user],
    async (stop, check) => {
      if (stop) throw stop;
      if (!check[0] || !await bcrypt.compare(pass, check[0].pass))
        return res.json({ status: 0, message: "User or password incorrect" });

      const token = jwt.sign({ id: check[0].id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      const cookieOption = {
        expiresIn: new Date(
          Date.now() * process.env.JWT_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res.cookie('logUser', token, cookieOption);
      return res.json({
        status: 1,
        message: "User is logged in successfully"});
    });
};
module.exports = login;