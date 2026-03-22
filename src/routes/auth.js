const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { validateSignupData } = require("../utils/validation");


//  STEP 1: BASIC SIGNUP (initial version)

// authRouter.post("/signup", async (req, res) => {
//   try {
//     const { firstName, lastName, emailId, password } = req.body;

//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password, // plain password (bad practice)
//     });

//     await user.save();

//     res.send("User added successfully");

//   } catch (err) {
//     res.status(400).send("ERROR:" + err.message);
//   }
// });


//STEP 2: ADD VALIDATION + PASSWORD HASHING

// authRouter.post("/signup", async (req, res) => {
//   try {
//     validateSignupData(req);

//     const { firstName, lastName, emailId, password } = req.body;

//     const passwordHash = await bcrypt.hash(password, 10);

//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });

//     await user.save();

//     res.status(200).send("User added successfully");

//   } catch (err) {
//     res.status(400).send("ERROR:" + err.message);
//   }
// });


// STEP 3: ADVANCED SIGNUP (FINAL VERSION)

authRouter.post("/signup", async (req, res) => {
  try {
    //Step 1: Validate input data
    validateSignupData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      about,
      skills,
    } = req.body;

    // Step 2: Check if email already exists
    const checkEmail = await User.findOne({ emailId });
    if (checkEmail) {
      throw new Error("Email Already Exists");
    }

    // Step 3: Hash password (security)
    const passwordHash = await bcrypt.hash(password, 10);

    // Step 4: Create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      about,
      skills,
    });

    // Step 5: Save user
    const savedUser = await user.save();

    // Step 6: Generate JWT token
    const token = await savedUser.getjwt();

    // Step 7: Store token in cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      httpOnly: true, // prevents XSS attacks
    });

    // Step 8: Send response
    res.status(200).json({
      message: "User added successfully",
      data: savedUser,
    });

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


//  STEP 1: BASIC LOGIN
// authRouter.post("/login", async (req, res) => {
//   const { emailId, password } = req.body;

//   const user = await User.findOne({ emailId });

//   if (!user) {
//     return res.send("User not found");
//   }

//   if (user.password === password) {
//     res.send("Login success");
//   } else {
//     res.send("Wrong password");
//   }
// });


//  ADVANCED LOGIN (FINAL VERSION)
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //  Validate email format
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Email");
    }

    //  Check if user exists
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    //  Compare hashed password
    const isValidPassword = await user.validatePassword(password);

    if (isValidPassword) {
      //  Generate token
      const token = await user.getjwt();

      //  Set cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
      });

      res.status(200).json({ user });

    } else {
      throw new Error("Invalid Credentials"); // fixed typo
    }

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


//  LOGOUT (FINAL)
authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("User Logged out successfully");
});

module.exports = authRouter;