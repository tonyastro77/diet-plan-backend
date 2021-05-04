const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const foodsDBRouter = require('./controllers/allFoodDB')
const foodsRouter = require('./controllers/food')
const loginRouter = require('./controllers/login')
const personalInfo = require('./controllers/personalInfo')
const progressRouter = require('./controllers/progress')
const usersRouter = require('./controllers/user')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/foods', foodsRouter)
app.use('/api/foodDB', foodsDBRouter)
app.use('/api/progress', progressRouter)
app.use('/api/login', loginRouter)
app.use('/api/personalInfo', personalInfo)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app