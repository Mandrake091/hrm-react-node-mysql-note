const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../routes/db-config");
//i use this https://www.npmjs.com/package/jsonwebtoken
//is cryptography library for token authentication
//in file .env you find the rules for JWT_SECRET to randomize tokens

//i use this https://www.npmjs.com/package/bcryptjs
//crypt and decrypt the password

//JWT-EXPIRATION you can find in .end file when the tokes must be expired


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