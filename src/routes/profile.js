const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditFields } = require("../utils/validation");


// STEP 1: BASIC PROFILE VIEW
// profileRouter.get("/profile/view", userAuth, async (req, res) => {
//   Directly return logged-in user
//   res.send(req.user);
// });


// STEP 2: CLEAN VERSION (CURRENT)
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  const user = req.user;

  // req.user is set by userAuth middleware after token verification
  res.send(user);
});


// profileRouter.post("/profile/edit", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;

  // Directly updating all fields without validation (unsafe)
//     Object.keys(req.body).forEach((key) => {
//       loggedInUser[key] = req.body[key];
//     });

//     await loggedInUser.save();

//     res.send("Profile updated");

//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });


// STEP 2: ADD VALIDATION (safer)

// profileRouter.post("/profile/edit", userAuth, async (req, res) => {
//   try {
//     if (!validateEditFields(req)) {
//       throw new Error("Invalid Edit request");
//     }

//     const loggedInUser = req.user;

//     Object.keys(req.body).forEach((key) => {
//       loggedInUser[key] = req.body[key];
//     });

//     await loggedInUser.save();

//     res.json({
//       message: "Profile updated successfully",
//       data: loggedInUser,
//     });

//   } catch (err) {
//     res.status(400).send("ERROR: " + err.message);
//   }
// });


// STEP 3: ADVANCED EDIT (FINAL VERSION)

profileRouter.post("/profile/edit", userAuth, async (req, res) => {
  try {
    // Step 1: Validate allowed fields
    if (!validateEditFields(req)) {
      throw new Error("Invalid Edit request");
    }
    const loggedInUser = req.user;
    // Step 2: Update only provided fields dynamically
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    // Step 3: Save updated user
    await loggedInUser.save();
    // Step 4: Send structured response
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});





module.exports = profileRouter;