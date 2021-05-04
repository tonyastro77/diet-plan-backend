const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 6    
  },
  name: String,
  passwordHash: String,
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }
  ],
  progress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Progress'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User