const validator = require("validator");


// 1. SIGNUP VALIDATION
// STEP 1: BROKEN VERSION (your old code)
// Problems:
// - Duplicate destructuring
// - Code written outside function
// - Syntax errors
// - Function closes early

// const validateSignupData = (req) => {
//     const { firstName, lastName, emailId, password } = req.body;
//     const { firstName, lastName, emailId, password } = req.body;

//     if (!firstName || !lastName) {
//         throw new Error("Enter a vaid first or last name")
//     } else if (!validator.isEmail(emailId)) {
//         throw new Error("Enter a valid Email ID")
//     } else if (!validator.isStrongPassword(password)) {
//         throw new Error("Enter a strong password")
//     }
// }

// This part is OUTSIDE function (wrong)
// if (!firstName || !lastName) {
//   throw new Error("Enter a vaid first or last name");
// }


// STEP 2: FIXED VERSION 
// - Removed duplicate variables
// - Moved logic inside function
// - Syntax corrected

// const validateSignupData = (req) => {
//   const { firstName, lastName, emailId, password } = req.body;

//   if (!firstName || !lastName) {
//     throw new Error("Enter a valid first or last name");
//   }

//   if (!validator.isEmail(emailId)) {
//     throw new Error("Enter a valid Email ID");
//   }

//   if (!validator.isStrongPassword(password)) {
//     throw new Error("Enter a strong password");
//   }
// };


// STEP 3: CLEAN FINAL VERSION 
const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter a valid first or last name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid Email ID");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};



// 2. EDIT PROFILE VALIDATION
// STEP 1: BASIC VERSION 
// - No restriction → user can edit anything

// const validateEditFields = (req) => {
//   return true;
// };


// STEP 2: ADD FIELD RESTRICTION 
// const validateEditFields = (req) => {
//   const allowedEditFields = ["firstName", "lastName"];

//   return Object.keys(req.body).every((field) =>
//     allowedEditFields.includes(field)
//   );
// };


// STEP 3: ADVANCED FINAL VERSION 
const validateEditFields = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "about",
    "photoURL",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};
module.exports = {
  validateSignupData,
  validateEditFields,
};