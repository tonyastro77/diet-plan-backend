const progressRouter = require('express').Router()
const Progress = require('../models/progress')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

progressRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ 
      error: 'token missing or invalid' 
    })
  }  
  const user = await User.findById(decodedToken.id)

  const progress = await Progress.find({user: user._id}).populate('user', {username: 1, name: 1}).sort({name: 1})

  response.json(progress.map(x => x.toJSON()))
})

progressRouter.get('/:id', async (request, response) => {
  const progress = await Progress.findById(request.params.id)

  if(progress){
    response.json(progress.toJSON())
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

progressRouter.post('/', async (request, response) => {
    const body = request.body
  
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    const user = await User.findById(decodedToken.id)

    const info = new Progress({
        suggestedCalories: body.suggestedCalories,
        totalCalories: body.totalCalories,
        date: new Date,
        user: user._id
    })
  
    const savedProgress = await info.save()
    user.progress = user.progress.concat(savedProgress._id)

    await user.save()

    response.json(savedProgress.toJSON())
})

progressRouter.delete('/:id', async (request, response) => {
  await Progress.findByIdAndRemove(request.params.id)
        response.status(204).end()
})

progressRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    const user = await User.findById(decodedToken.id)

    const progress = {
      suggestedCalories: body.suggestedCalories,
      totalCalories: body.totalCalories,
      user: user._id
    }
  
    Progress.findByIdAndUpdate(request.params.id, progress, { new: true })
      .then(x => {
        response.json(x.toJSON())
      })
      .catch(error => next(error))
})

module.exports = progressRouter