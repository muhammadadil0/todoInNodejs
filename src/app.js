const express = require('express')
const todoroutes = require('./routes/todo.routes')
require('dotenv').config()
const connectDB = require('./db/db')
const app = express();

connectDB();
app.use(express.json())

app.use('/api',todoroutes)


module.exports = app;