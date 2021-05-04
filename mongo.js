const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tonyastro:${password}@cluster0.vmsen.mongodb.net/DietAppDB?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 6    
  },
  name: String,
  age: Number,
  height: Number,
  weight: Number,
  date: Date,
  passwordHash: String,
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food'
    }
  ],
})

const User = mongoose.model('User', userSchema)

const user = new User({
  username: 'avillegas',
  name: 'Anthony Villegas',
  age: 30,
  height: 1.75,
  weight: 87,
  date: new Date(),
  password: 'anthony1234',
})

user.save().then(result => {
  console.log('user saved!')
  mongoose.connection.close()
})

User.find({}).then(result => {
  result.forEach(x => {
    console.log(x)
  })
  mongoose.connection.close()
})