const Merchant = require("../models/merchant")

  const addNewMerchant = async (req,res)=>{
   try{await Merchant.create(req.body)
  return res.json({
      msg: 'Merchant Added!'
    })
  }
  catch{
    return res.status(400).json({
      msg: 'Invalid data format or missing required fields.'
    })
  }
  }


  const getAllMerchant = async (req,res)=>{
   const merchantList =  await Merchant.find()
   return res.json(merchantList)
   }
  
   const deleteMerchantById = async (req,res)=>{
    const merchantList =  await Merchant.findByIdAndDelete(req.params.id)
    return res.json(merchantList)
    }
   

   const getMerchantsById = async (req,res)=>{
    try{
      const merchantList =  await Merchant.findById(req.params.id)
       res.json(merchantList)
    }catch(err){

      return res.json({
        msg: "unable to fetch"
      })
    }
 
    }
   
  module.exports = { addNewMerchant,getAllMerchant,deleteMerchantById,getMerchantsById}