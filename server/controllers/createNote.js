const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");

const createNote = (req, res) => {
  if (!req.cookies.logUser)
    return res.json({ status: 0, message: "Please log in again!" });
  const user = jwt.verify(
    req.cookies.logUser,
    process.env.JWT_SECRET,
    (err, id) => {
      if (err) return null;
      else return id;
    }
  );
  if (user == null)
    return res.json({ status: 0, message: "Please log in again" });
  const { title, note } = req.body;
  const time = new Date(Date.now());
  const date =
    time.getFullYear() +
    "-" +
    time.getMonth() +
    1 +
    "-" +
    time.getDate() +
    " " +
    time.getHours() +
    ":" +
    time.getMinutes() +
    ":" +
    time.getSeconds();
  db.query("INSERT INTO notes SET ?", { title, note, date, user_id:user.id }, (err, result) => {
    if (err) throw err;
    return res.json({ status: 1, message: "Note added successfully" });
  });
};
module.exports = createNote;
