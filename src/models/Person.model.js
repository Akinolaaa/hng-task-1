const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    minlength: 1
  }
});

module.exports = mongoose.model('Person', PersonSchema);