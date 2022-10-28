const db = require('../routes/db-config');
const jwt = require("jsonwebtoken");

const deleteNote = (req, res) => {
if(!req.cookies.logUser) return res.json({status: 0, message: 'Please log in again!'})
  const user = jwt.verify(req.cookies.logUser, process.env.JWT_SECRET, (err, id) =>{ if (err) return null; else return id})
    
     
      if(user == null) return res.json({ status: 0, message: "Please log in again" });

  
  const {note_id} = req.body
  db.query('DELETE FROM notes WHERE note_id = ?',[note_id], (err, result)=>{
    if(err ) throw err
    return res.json({status: 1, message:'Note deleted successfully'})
  })
}
module.exports = deleteNote;