const User = require("../models/user")
const NPayReserve = require('../models/npayReserve')

  const updateBalance = async (req,res)=>{
      const receiverUser = await User.findOne({phoneNumber: req.body.npayIdReceiver})
      const senderUser = await User.findOne({phoneNumber: req.body.npayIdSender})
      const npayReserve = await NPayReserve.find()

      const amt = Number(req.body.amount)
      //const amountWithCharge = req.body.amount+npayReserve[0].npayServiceCharge/100*req.body.amount
      const amountWithCharge = amt + (npayReserve[0].npayServiceCharge / 100) * amt;

      if(senderUser.totalBalance < amountWithCharge) return res.json({
        msg: "insufficient balance"
      })

      if(senderUser.isKycVerified ||  amt <= 1000 ){
        senderUser.totalBalance = senderUser.totalBalance- (amountWithCharge)
        senderUser.save()

        receiverUser.totalBalance = receiverUser.totalBalance + amt
        receiverUser.save()

        await NPayReserve.updateMany({},{npayBalance:npayReserve[0].npayBalance + npayReserve[0].npayServiceCharge/100*amt });
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