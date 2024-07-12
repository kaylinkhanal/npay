const { Router } = require('express'); 
const router = Router(); 

const { addNewNotice,getAllNotices} = require('../controllers/notice');

router.post('/notice', addNewNotice)
router.get('/notice', getAllNotices)
  module.exports = router



  