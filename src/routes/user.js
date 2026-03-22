const express = require("express");
const userRouter = express.Router();
// Middleware to check if user is authenticated
const { userAuth } = require("../middlewares/auth");
// Models
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");
// Only expose safe user fields (security best practice)
// const USER_SAFE_DATA = "firstName lastName photoURL about age gender";
const USER_SAFE_DATA = "firstName lastName photoURL about age gender skills";
// 1. Get all received connection requests (PENDING)
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // Find all requests sent TO the logged-in user
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "intrested", // pending requests
    })
    // Populate sender details instead of just ID
    .populate("fromUserId", USER_SAFE_DATA);

    return res.status(200).json({
      connectionRequests,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});


// 2. Get all accepted connections (friends list)

//a.basic code for getting all accepted connections
// userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;
//     const connectionRequests = await ConnectionRequestModel.find({
//       toUserId: loggedInUser._id,
//       status: "intrested",
//     }).populate("fromUserId", USER_SAFE_DATA);
//     return res.status(200).json({
//       connectionRequests,
//     });
//   } catch (error) {
//     res.status(400).send("ERROR:" + error.message);
//   }
// });

//b. updated code for getting all accepted connections (both sent and received)
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // Find all accepted connections (both directions)
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
    // Populate both users in the connection
    .populate("fromUserId toUserId", USER_SAFE_DATA);
    // Extract only the OTHER user (not yourself)
    const data = connectionRequests.map((row) => {
      // If YOU sent the request → return receiver
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      // If YOU received the request → return sender
      return row.fromUserId;
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

// 3. FEED 
//a. (BASIC VERSION )
// userRouter.get("/user/feed", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;
     // Fetch all connection requests (sent + received)
//     const connectionRequest = await ConnectionRequestModel.find({
//       $or: [
//         { fromUserId: loggedInUser._id },
//         { toUserId: loggedInUser._id }
//       ],
//     });
     // PROBLEM:
     // - Not filtering users
     // - Not excluding self
     // - Not returning actual users
     // - No pagination
//     res.send(connectionRequest);
//   } catch (error) {
//     res.status(400).send("ERROR: " + error.message);
//   }
// });
// module.exports = userRouter;

//b.FEED: UPDATED VERSION WITH FILTERING + PAGINATION
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // Pagination setup
    const page = parseInt(req.query.page) || 1;   // default page = 1
    let limit = parseInt(req.query.limit) || 10;  // default limit = 10
    // Restrict max limit (avoid server overload)
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    // Step 1: Find all connection requests (sent + received)
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id }
      ],
    }).select("fromUserId toUserId");
    // Step 2: Build a set of users to EXCLUDE from feed
    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    // Step 3: Find users NOT in hidden list and NOT yourself
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, // exclude connections
        { _id: { $ne: loggedInUser._id } },               // exclude yourself
      ],
    })
    .select(USER_SAFE_DATA)
    .skip(skip)   // pagination skip
    .limit(limit); // pagination limit

    // Final Response
    res.status(200).json({
      users,
      page,
      limit
    });

  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;