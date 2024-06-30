const User = require("../models/user")

  const updateBalance = async (req,res)=>{
      const receiverUser = await User.findOne({phoneNumber: req.body.npayIdReceiver})
      receiverUser.totalBalance = receiverUser.totalBalance + req.body.amount
      receiverUser.save()

      const senderUser = await User.findOne({phoneNumber: req.body.npayIdSender})
      console.log(senderUser.totalBalance,req.body.amount)
      if(senderUser.totalBalance < req.body.amount) return res.json({
        msg: "insufficient balance"
      })
      if(senderUser.isKycVerified ||  req.body.amount <= 1000 ){
        senderUser.totalBalance = senderUser.totalBalance- req.body.amount
        senderUser.save()
      }else{
        return res.json({
          msg: "Your transaction limit is 1000 rs only"
        })
      }
      return res.json({
        msg: "transactions success"
      })
  }



   
  module.exports = { updateBalance}