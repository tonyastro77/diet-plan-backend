const foodsRouter = require('express').Router()
const Food = require('../models/food')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

foodsRouter.get('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ 
      error: 'token missing or invalid' 
    })
  } 
  const user = await User.findById(decodedToken.id)

  const foods = await Food.find({user: user._id}).populate('user', {username: 1, name: 1}).sort({name: 1})

  response.json(foods.map(x => x.toJSON()))
})

foodsRouter.get('/:id', async (request, response) => {
  const food = await Food.findById(request.params.id)

  if(food){
    response.json(food.toJSON())
  } else {
    response.status(404).end()
  }
})

foodsRouter.post('/', async (request, response) => {
    const body = request.body
  
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    const user = await User.findById(decodedToken.id)

    const food = new Food({
        name: body.name,
        calories: body.calories,
        fat: body.fat,
        carbohydrates: body.carbohydrates,
        protein: body.protein,
        quantity: body.quantity,
        date: new Date,
        user: user._id
    })
  
    const savedFood = await food.save()
    user.foods = user.foods.concat(savedFood._id)

    await user.save()

    response.json(savedFood.toJSON())
})

foodsRouter.delete('/:id', async (request, response) => {
  await Food.findByIdAndRemove(request.params.id)
        response.status(204).end()
})

foodsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ 
        error: 'token missing or invalid' 
      })
    }
    const user = await User.findById(decodedToken.id)

    const food = {
      name: body.name,
      calories: body.calories,
      fat: body.fat,
      carbohydrates: body.carbohydrates,
      protein: body.protein,
      quantity: body.quantity,
      user: user._id
    }
  
    Food.findByIdAndUpdate(request.params.id, food, { new: true })
      .then(x => {
        response.json(x.toJSON())
      })
      .catch(error => next(error))
})

module.exports = foodsRouter