const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [3, "First name must be at least 3 characters"],
      maxLength: [50, "First name cannot exceed 50 characters"]
    },

    lastName: {
      type: String,
      trim: true,
      maxLength: [50, "Last name cannot exceed 50 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email address: "+value);
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
         validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password :" + value)
            }
        }
    },

    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [100, "Age cannot be more than 100"]
    },

    gender: {
      type: String,
      lowercase: true,
      trim: true,
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female or other"
      }
    },

    about: {
      type: String,
      default: "Dev is in search for someone here"
    },

    photoURL: {
      type: String,
      trim: true,
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("Invalid photo URL: " + value);
        }
      },
    },
    skills: {
      type: [String]
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

