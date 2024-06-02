const express = require('express')
const dbConnect = require('./src/db/connection')
dbConnect()
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  addr: String,
});


const User = mongoose.model('User', userSchema);
const port = process.env.PORT


app.post('/users', (req, res) => {
  User.create({name:"kaylin", addr:"ktm"})
  res.send('ok')
})

app.get('/users', async (req, res) => {
  const data = await User.find()
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})