const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
 
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationCode: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    required: true,
    default: 'admin',
  },
  date: {
    type: Date,
    default: Date.now,
  },

})

const admin = mongoose.model('admin', AdminSchema)

module.exports = admin
