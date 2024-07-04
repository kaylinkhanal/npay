const NPayReserve = require("../models/npayReserve")
const User = require("../models/user")

  const updateBalance = async (req,res)=>{
      const receiverUser = await User.findOne({phoneNumber: req.body.npayIdReceiver})
      const senderUser = await User.findOne({phoneNumber: req.body.npayIdSender})
      const npayReserve =await NPayReserve.find()



      const amountWithCharge = req.body.amount + npayReserve[0].npayServiceCharge/100 * Number(req.body.amount)
 
      if(senderUser.totalBalance < amountWithCharge) return res.json({
        msg: "insufficient balance"
      })
      
      if(senderUser.isKycVerified ||   Number(req.body.amount) <= 1000 ){
        senderUser.totalBalance = senderUser.totalBalance - (amountWithCharge)
        senderUser.save()
        receiverUser.totalBalance = receiverUser.totalBalance +  Number(req.body.amount)
        receiverUser.save()
        await NPayReserve.updateMany({}, { npayBalance: npayReserve[0].npayBalance + npayReserve[0].npayServiceCharge/100 *  Number(req.body.amount)  });
       
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