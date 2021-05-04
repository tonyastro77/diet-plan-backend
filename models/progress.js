const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const progressSchema = new mongoose.Schema({
    suggestedCalories: Number,
    totalCalories: Number,
    date: {
      type: Date,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

progressSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

progressSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Progress', progressSchema)