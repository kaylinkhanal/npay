const express = require('express')

const dbConnect = require('./src/db/connection')
const userRoute = require('./src/routes/user')
const productRoute = require('./src/routes/product')
const transactionsRoute = require('./src/routes/transactions')
const roomsRoute = require('./src/routes/rooms')
const path = require('path')

const initializeNPayBalanceAndCharge = require('./src/initializeNpay/script')
const cors = require('cors');
initializeNPayBalanceAndCharge()
dbConnect()
const app = express()

app.use(cors())
require('dotenv').config()
//body parser
app.use(express.json())
app.use(userRoute)
app.use(productRoute)
app.use(transactionsRoute)
app.use(roomsRoute)

const port = process.env.PORT || 8000

app.use('/rooms-image', express.static(path.join(__dirname, 'uploads/rooms')))


// app.use())
// express.static(
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})