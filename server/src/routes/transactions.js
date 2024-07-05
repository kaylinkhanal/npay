const { Router } = require('express'); 

const router = Router(); 

const { updateBalance,getStatementByUserId} = require('../controllers/transactions');

router.patch('/transactions', updateBalance)
router.get('/statements/:userId', getStatementByUserId)
  module.exports = router



  