const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.port


const userList= [
  {id:1, name:'kaylin',addr: 'ktm'},
  {id:2, name:'ram',addr: 'ktm'},
  {id:4, name:'gopal',addr: 'pkr'},
  {id:5, name:'jeken',addr: 'bhk'},
]
app.get('/users', (req, res) => {
  
const particularUser = userList.find((item)=>{
    if(item.name.includes(req.query.search)) {
        return item
    }
})

res.send(particularUser)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})