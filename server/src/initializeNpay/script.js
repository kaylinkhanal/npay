const NPayReserve = require('../models/npayReserve')
const initializeNPayBalanceAndCharge= async() =>{
    try{
        const npayReserve = await NPayReserve.find()
        if (npayReserve.leangth>0){
            console.log("Npay reserve exists")
        }else{
            await NPayReserve.create({})
            console.log("Npay reserve created")
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = initializeNPayBalanceAndCharge