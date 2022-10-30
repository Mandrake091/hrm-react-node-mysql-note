const express = require("express");
const router = express.Router();

//get routes in external files
const deleteNote = require("./deleteNote");
const updateNote = require("./updateNote");
const createNote = require("./createNote");
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const isLogged = require("./isLogged");
const getNotes = require("./getNotes");



//routes for rest
router.post("/register", register);
router.post("/login", login);
router.post("/createNote", createNote);
router.get("/logout", logout);
router.post("/deleteNote", deleteNote);
router.post("/updateNote", updateNote);
router.get("/isLogged", isLogged);
router.get("/getNotes", getNotes);


module.exports = router;
