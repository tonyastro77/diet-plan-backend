const mongoose = require('mongoose')

const personalInfoSchema = mongoose.Schema({
  age: Number,
  height: Number,
  weight: Number,
  gender: String,
  activity: String,
  goal: String,
  genderconstant: Number,
  activityconstant: Number,
  goalconstant: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})

personalInfoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('PersonalInfo', personalInfoSchema)