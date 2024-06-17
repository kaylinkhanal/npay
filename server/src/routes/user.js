const { Router } = require('express'); 
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/citizenship/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = Router(); 

const { registerUser, loginUser, findAllUsers,updateUserKyc,checkKycStatusByUserId,getUserKyc } = require('../controllers/user');

router.post('/register', registerUser)
  
  router.post('/login', loginUser)
  
  
  router.get('/users', findAllUsers)

  router.post('/user-kyc',upload.single('citizenshipPhoto'),  updateUserKyc)

  router.get('/kyc-status/:userId', checkKycStatusByUserId)

  router.get('/user-kyc', getUserKyc)

  module.exports = router



  