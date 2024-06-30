const User = require("../models/user")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const UserKyc = require("../models/userKyc");

const findAllUsers = async(req,res)=>{
    const data = await User.find()
    res.json(data)
  }





 const loginUser=  async(req,res)=>{
    console.log(req.body)
    //STEP 1:
    //check if phone number exist
    const user  = await User.findOne({phoneNumber: req.body.phoneNumber})
    if(user){
    const isMatched=  await bcrypt.compare(req.body.password, user.password);
      if(isMatched){
        const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);
        res.json({msg: "Authorized", token, user })
      }else{
        res.status(401).json({msg: "Invalid Password"})
      }
    }else{
      res.status(401).json({msg: "Phone Number not registered"})
    }
    //
  
    // YES: 
      // check if password matches
        // NO: res.json({msg: "Incorrect password"})
        //YES: token
  }




const registerUser =  async (req, res) => {
    try{
      const hashPassword = await bcrypt.hash(req.body?.password, saltRounds)
      req.body.password = hashPassword
      const phoneExist  = await User.exists({phoneNumber: req.body.phoneNumber})
      const emailExist  = await User.exists({email: req.body.email})
    
      if(phoneExist ){
       return res.status(409).json({msg: "Phone Number is taken!"})
      }else if(emailExist){
        return res.status(409).json({msg: "Email is taken!"})
      }
      await User.create(req.body)
      return res.json({msg: "User registered"})
  
    }catch(err){
      res.status(500).json({msg: "Something went wrong!"})
    }
  
  }


  const updateUserKyc = async (req,res)=>{
    console.log(req.body)
    req.body.citizenshipPhoto = req.file.filename
    req.body.kycVerifiedStatus = 'pending'
    await UserKyc.create(req.body)
    res.json({
      msg: "KYC submitted! Please wait for verification!"
    })
  }


  const checkKycStatusByUserId= async (req,res)=>{
    const kycDetails =await UserKyc.findOne({userId: req.params.userId})
    if(!kycDetails){
     return res.json({
        kycVerifiedStatus: 'unVerified'
      })
    }
   return res.json({
      kycVerifiedStatus: kycDetails.kycVerifiedStatus
    })

  }

  const getUserKyc = async (req,res)=>{
   const userKyc =  await UserKyc.find()
   res.json(
    userKyc
   )
  }

  module.exports = { findAllUsers, getUserKyc,loginUser ,registerUser,updateUserKyc,checkKycStatusByUserId}