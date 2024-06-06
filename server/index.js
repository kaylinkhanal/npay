const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const dbConnect = require('./src/db/connection')
const cors = require('cors')


dbConnect()
const app = express()
app.use(cors())
require('dotenv').config()
//body parser
app.use(express.json())
const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  phoneNumber: String, // String is shorthand for {type: String}
  fullName: String,
  email: String,
  password: String,
  gender: {
    type: String,
    enum : ['male','female','other'],
    default: 'female'
  },
  role: {
    type: String,
    enum : ['admin','user'],
    default: 'user'
  },
});
const User = mongoose.model('User', userSchema);
const port = process.env.PORT || 8000

app.post('/register', async (req, res) => {
  console.log(req.body)
  const hashPassword = await bcrypt.hash(req.body?.password, saltRounds)
  req.body.password = hashPassword
  const phoneExist  = await User.exists({phoneNumber: req.body.phoneNumber})
  const emailExist  = await User.exists({email: req.body.email})

  if(phoneExist ){
   return res.json({msg: "Phone Number is taken!"})
  }else if(emailExist){
    return res.json({msg: "Email is taken!"})
  }
  await User.create(req.body)
  return res.json({msg: "User registered"})
})

app.post('/login',async(req,res)=>{
  console.log(req.body)
  //STEP 1:
  //check if phone number exist
  const user  = await User.findOne({phoneNumber: req.body.phoneNumber})
  if(user){
  const isMatched=  await bcrypt.compare(req.body.password, user.password);
    if(isMatched){
      const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);
      res.json({msg: "Authorized", token})
    }else{
      res.json({msg: "Invalid Password"})
    }
  }else{
    res.json({msg: "Phone Number not registered"})
  }
  //

  // YES: 
    // check if password matches
      // NO: res.json({msg: "Incorrect password"})
      //YES: token
})


app.get('/users',async(req,res)=>{
  const data = await User.find()
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})