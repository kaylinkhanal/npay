const NPayReserve = require("../models/npayReserve")
const Transactions = require("../models/transactions")
const User = require("../models/user")
const router = require("../routes/user")

  const updateBalance = async (req,res)=>{
    const {npayIdSender, npayIdReceiver ,amount , remarks}=  req.body
      const receiverUser = await User.findOne({phoneNumber: npayIdReceiver})
      const senderUser = await User.findOne({phoneNumber: npayIdSender})
      const npayReserve =await NPayReserve.find()
      


      const amountWithCharge = Number(amount) + npayReserve[0].npayServiceCharge/100 * Number(amount)

      if(senderUser.totalBalance < amountWithCharge) return res.json({
        msg: "insufficient balance"
      })
      
      if(senderUser.isKycVerified ||   Number(amount) <= 1000 ){
        senderUser.totalBalance = senderUser.totalBalance - (amountWithCharge)
        senderUser.save()
        receiverUser.totalBalance = receiverUser.totalBalance +  Number(amount)
        receiverUser.save()
        await NPayReserve.updateMany({}, { npayBalance: npayReserve[0].npayBalance + npayReserve[0].npayServiceCharge/100 *  Number(amount)  });
       
      }else{
        return res.json({
          msg: "Your transaction limit is 1000 rs only"
        })
      }
      const transactionDetail = await Transactions.create({
        sender: npayIdSender,
        receiver: npayIdReceiver,
        amount,
        remarks,
        remainingAmountSender:senderUser.totalBalance,
        remainingAmountReceiver: receiverUser.totalBalance,
        transactionServiceChargre: [npayReserve[0].npayServiceCharge]/100*amount
      })

      return res.json({
        msg: "transactions success",
        transactionId: transactionDetail._id,
        transactionDetail,
        senderUserTotalBalance:  senderUser.totalBalance
      })
  }

// i need only those transactions done by
    const getStatementByUserId = async(req,res) => {
      const data = await Transactions.find({
         $or: [
                  { sender: req.params.userId },
                   { receiver: req.params.userId }
               ]
      });

        res.json(data)
      }
   
  module.exports = { updateBalance,getStatementByUserId}