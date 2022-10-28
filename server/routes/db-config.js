const sql = require('mysql');
const db = sql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  port: "8889",
  database: "homeworkDB",
});
module.exports = db;