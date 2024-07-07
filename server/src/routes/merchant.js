const { Router } = require('express'); 
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/product/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = Router(); 

const { addNewMerchant,getAllMerchant,deleteMerchantById,getMerchantsById} = require('../controllers/merchant');

router.post('/merchant', addNewMerchant)
router.get('/merchant', getAllMerchant)
router.delete('/merchant/:id', deleteMerchantById)
router.get('/merchant/:id', getMerchantsById)
  module.exports = router



  