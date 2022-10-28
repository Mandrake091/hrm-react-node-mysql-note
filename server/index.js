const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./routes/db-config');
const cookie = require('cookie-parser');
const app = express();

const PORT =  8080;
const cors = require("cors");
db.connect(e => {if (e) throw e});
app.use(cors());
app.use(cookie());
app.use(express.json());
app.use('/api', require('./controllers/app'))
app.listen(PORT,() => {console.log('on listen')})