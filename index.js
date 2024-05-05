const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const MD_DATA = "mongodb://0.0.0.0/e-commerce?readPreference=primary"
const cors = require('cors')
const port = 5000
const routes = require('./routes')
const URL = 'http://localhost:3000'

app.use(cors({
    origin : URL,
    credentials : true
}))
app.use(cookieParser())
app.use(express.json())

mongoose.connect(MD_DATA)

const db = mongoose.connection
db.once('open' , ()=>{
    console.log('connect mongoDB')
})

db.on('error',(error)=>{
    console.log(error)
})

app.use('/api',routes)

app.listen(port , ()=>{
    console.log(`http://localhost:${port}`)
})