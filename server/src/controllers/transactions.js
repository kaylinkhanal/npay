const NPayReserve = require("../models/npayReserve");
const Transactions = require("../models/transactions");
const Bills = require("../models/bills");

const User = require("../models/user");
const router = require("../routes/user");
const Merchant = require("../models/merchant");

const updateBalance = async (req, res) => {
  const { npayIdSender, npayIdReceiver, amount, remarks } = req.body;
  const receiverUser = await User.findOne({ phoneNumber: npayIdReceiver });
  const senderUser = await User.findOne({ phoneNumber: npayIdSender });
  const npayReserve = await NPayReserve.find();

  const amountWithCharge =
    Number(amount) + (npayReserve[0].npayServiceCharge / 100) * Number(amount);

  if (senderUser.totalBalance < amountWithCharge)
    return res.json({
      msg: "insufficient balance",
    });

  if (senderUser.isKycVerified || Number(amount) <= 1000) {
    senderUser.totalBalance = senderUser.totalBalance - amountWithCharge;
    senderUser.save();
    receiverUser.totalBalance = receiverUser.totalBalance + Number(amount);
    receiverUser.save();
    await NPayReserve.updateMany(
      {},
      {
        npayBalance:
          npayReserve[0].npayBalance +
          (npayReserve[0].npayServiceCharge / 100) * Number(amount),
      });
      
      const transactionDetail = await Transactions.create({
        sender: npayIdSender,
        receiver: npayIdReceiver,
        amount,
        remarks,
        remainingAmountSender:senderUser.totalBalance,
        remainingAmountReceiver: receiverUser.totalBalance,
        transactionServiceCharge: [npayReserve[0].npayServiceCharge]/100*amount
      })

      return res.json({
        msg: "transactions success",
        transactionId: transactionDetail._id,
        transactionDetail,
        senderUserTotalBalance:  senderUser.totalBalance
      })
  }
};

const submitBills = async (req, res) => {
  //save to
  //console.log(req.body)
  try {
    //get payerUserdetails
    const payerUser = await User.findOne({
      phoneNumber: req.body.payerPhoneNumber,
    });
      //check if the user have balance exceeding the amount he is trying to send
    if (payerUser.totalBalance < Number(req.body["Amount"]))
      return res.json({
        msg: "insufficient balance",
      });
    // reduce the amount from his balance and save to db
    payerUser.totalBalance =
      payerUser.totalBalance - Number(req.body["Amount"]);
    await payerUser.save();


    
    const merchantUser = await Merchant.findOne({
      merchantPhoneNumber: req.body.merchantPhoneNumber,
    });
  
    // since we defined some merchantServiceCharge so find service charge of received balance
    // and deducting it and add remaining to merchantBalance
    const serviceCharge =
      (merchantUser.merchantServiceCharge / 100) * Number(req.body["Amount"]);
    merchantUser.merchantBalance =
      merchantUser.merchantBalance + Number(req.body["Amount"]) - serviceCharge;
    await merchantUser.save();

    const npayReserve = await NPayReserve.findOne();
    npayReserve.npayBalance = npayReserve.npayBalance + serviceCharge;
    await npayReserve.save();
    const billData = req.body;
    const bill = new Bills(billData);
    await bill.save();

    return res.json({
      msg: "Bill submitted!",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Error in submitting bill",
      error,
    });
  }
};

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
   
  module.exports = { updateBalance,getStatementByUserId, submitBills}
