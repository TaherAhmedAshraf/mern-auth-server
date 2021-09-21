const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

const userRoutes = require('./routes/userRouter')

const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI

app.listen(PORT, () => { console.log(`Server is running on PORT: ${PORT}`) })

app.use(express.json())
app.use('/auth', userRoutes)


mongoose.connect(MONGO_URI)
    .then(res => console.log("Connected to Database"))
    .catch(err => console.log(err.message))
