const express = require('express')
const dbConnect = require('./config/dbConnect')
const authRoute = require('./routes/authRoute')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose')
const { notFound, errorHandler } = require('./middlewares/errorHandler')

const dotenv = require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Connection database MogoDB
mongoose.set('strictQuery', false)
dbConnect()

// Routes
app.use('/api/v1/user', authRoute)

const PORT = process.env.PORT || 4000

// Middlewares
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is runnig at PORT http://localhost:${PORT}`)
})
