const { Router } = require('express'); 

const router = Router(); 

const { updateBalance } = require('../controllers/transactions');

router.patch('/transactions', updateBalance)
  module.exports = router



  