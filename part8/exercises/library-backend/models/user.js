const mongoose = require('mongoose')

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 3
  }
})

module.exports = mongoose.model('User', schema)
