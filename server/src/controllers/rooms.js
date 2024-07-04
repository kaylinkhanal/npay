const Room = require("../models/room")

  const addNewRooms = async (req,res)=>{
    req.body.roomPhoto= req.file.filename
   await Room.create(req.body)
  return res.json({
      msg: 'Product Added!'
    })
  }



  const getAvailableRoom = async (req,res)=>{
  const room=  await Room.find()
  return res.json(room)
  }

   
  module.exports = { addNewRooms,getAvailableRoom}