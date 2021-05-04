const personalInfoRouter = require('express').Router()
const PersonalInfo = require('../models/personalInfo')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

personalInfoRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ 
      error: 'token missing or invalid' 
    })
  }  
  const user = await User.findById(decodedToken.id)

  const info = await PersonalInfo.find({user: user._id}).populate('user', {username: 1, name: 1}).sort({name:1})

  response.json(info.map(x => x.toJSON()))
})

personalInfoRouter.get('/:id', async (request, response) => {
  const info = await PersonalInfo.findById(request.params.id)

  if(info){
    response.json(info.toJSON())
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

personalInfoRouter.post('/', async (request, response) => {
    const body = request.body
  
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    const user = await User.findById(decodedToken.id)

    const info = new PersonalInfo({
        age: body.age,
        height: body.height,
        weight: body.weight,
        gender: body.gender,
        activity: body.activity,
        goal: body.goal,
        genderconstant: body.genderconstant,
        activityconstant: body.activityconstant,
        goalconstant: body.goalconstant,
        user: user._id,
    })
  
    const savedInfo = await info.save()

    response.json(savedInfo.toJSON())
})

personalInfoRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    const user = await User.findById(decodedToken.id)

    const info = {
        user: user._id,
        age: body.age,
        height: body.height,
        weight: body.weight,
        gender: body.gender,
        activity: body.activity,
        goal: body.goal,
        genderconstant: body.genderconstant,
        activityconstant: body.activityconstant,
        goalconstant: body.goalconstant,
    }
  
    PersonalInfo.findByIdAndUpdate(request.params.id, info, { new: true }).populate('user', {username: 1, name: 1})
      .then(x => {
        response.json(x.toJSON())
      })
      .catch(error => next(error))
})

module.exports = personalInfoRouter