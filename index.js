const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/userRouter')
const coustomerRouter = require('./routes/coustomerRouter')

const PORT = process.env.PORT || 8080
const MONGO_URI = process.env.MONGO_URI

app.listen(PORT, () => { console.log(`Server is running on PORT: ${PORT}`) })

app.use(express.json())
app.use(cookieParser())
app.use('/auth', userRoutes)
app.use('/coustomer', coustomerRouter)

mongoose.connect(MONGO_URI)
    .then(res => console.log("Connected to Database"))
    .catch(err => console.log(err.message))
