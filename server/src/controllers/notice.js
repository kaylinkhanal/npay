const Notice = require("../models/notice")

  const addNewNotice = async (req,res)=>{
   await Notice.create(req.body)
  return res.json({
      msg: 'Notice Added!'
    })
  }

  const getAllNotices = async (req,res)=>{
   const notice = await Notice.find()
   return res.json(notice)
   }
 

  

   
  module.exports = {addNewNotice,getAllNotices}