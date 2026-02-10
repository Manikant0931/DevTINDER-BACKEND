const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required:true, //as we have written required below the firstNmae so we have to pass firstName in postman to push the data in MongoDB. 
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required:true,
      unique:true,//the email id mmust be the uniquefrom the database,without uniqueness it will not pass.
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
