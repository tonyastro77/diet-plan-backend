const foodsDBRouter = require('express').Router()
const Food = require('../models/food')

foodsDBRouter.get('/', async (request, response) => {
    const foods = await Food.find({}).populate('user', {username: 1, name: 1}).sort({name: 1})
  
    response.json(foods.map(x => x.toJSON()))
})

module.exports = foodsDBRouter