const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      min: 18
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    
  },
)

const userModel = mongoose.model("User", userSchema)

module.exports=userModel;
