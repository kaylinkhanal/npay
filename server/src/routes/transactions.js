const { Router } = require('express'); 

const router = Router(); 

const { updateBalance,getStatementByUserId,submitBills} = require('../controllers/transactions');

router.patch('/transactions', updateBalance)
router.post('/bills',submitBills)
router.get('/statements/:userId', getStatementByUserId)
  module.exports = router



  