const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    fat: Number,
    carbohydrates: Number,
    protein: Number,
    quantity: Number,
    date: Date,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

foodSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Food', foodSchema)