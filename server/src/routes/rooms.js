const { Router } = require('express'); 
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/rooms/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = Router(); 

const {addNewRooms, getAvailableRoom} = require('../controllers/rooms');

router.post('/rooms',upload.single('roomsImage'), addNewRooms)
router.get('/rooms', getAvailableRoom)
  module.exports = router



  