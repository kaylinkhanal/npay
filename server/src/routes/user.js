const { Router } = require('express'); 
const router = Router(); 

const { registerUser, loginUser, findAllUsers } = require('../controllers/user');

router.post('/register', registerUser)
  
  router.post('/login', loginUser)
  
  
  router.get('/users', findAllUsers)

  module.exports = router



  