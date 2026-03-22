const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");


// STEP 1: BASIC SEND REQUEST (very minimal ❌)

// requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
//   try {
//     const fromUserId = req.user._id;
//     const { toUserId, status } = req.params;

//     const connectionRequest = new ConnectionRequestModel({
//       fromUserId,
//       toUserId,
//       status,
//     });

//     await connectionRequest.save();

//     res.send("Request sent");

//   } catch (error) {
//     res.status(400).send("ERROR: " + error.message);
//   }
// });


// STEP 2: ADD VALIDATIONS (safer)

// requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
//   try {
//     const fromUserId = req.user._id;
//     const { toUserId, status } = req.params;

//     Check if user exists
//     const toUser = await User.findById(toUserId);
//     if (!toUser) {
//       throw new Error("User not found");
//     }

//     Validate status
//     const allowedStatuses = ["ignored", "intrested"];
//     if (!allowedStatuses.includes(status)) {
//       throw new Error("Invalid status");
//     }

//     const connectionRequest = new ConnectionRequestModel({
//       fromUserId,
//       toUserId,
//       status,
//     });

//     await connectionRequest.save();

//     res.send("Request sent");

//   } catch (error) {
//     res.status(400).send("ERROR: " + error.message);
//   }
// });


// STEP 3: ADVANCED SEND REQUEST (FINAL VERSION)

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const { toUserId, status } = req.params;

      // Step 1: Check if receiver exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found",
          success: false,
        });
      }

      // Step 2: Prevent sending request to yourself (optional improvement)
      // if (fromUserId.toString() === toUserId.toString()) {
      //   return res.status(400).json({
      //     message: "You cannot send request to yourself",
      //     success: false,
      //   });
      // }

      // Step 3: Validate status
      const allowedStatuses = ["ignored", "intrested"];
      if (!allowedStatuses.includes(status)) {
        throw new Error("Invalid status type: " + status);
      }

      // Step 4: Prevent duplicate requests (both directions)
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Already sent the connection request before");
      }

      // Step 5: Create request
      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      // Step 6: Response
      res.status(200).json({
        message: user.firstName + " is " + status + " in " + toUser.firstName,
        data,
        success: true,
      });

    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);


// STEP 1: BASIC REVIEW REQUEST

// requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
//   try {
//     const { requestId, status } = req.params;

//     const connectionRequest = await ConnectionRequestModel.findById(requestId);

//     connectionRequest.status = status;
//     await connectionRequest.save();

//     res.send("Updated");

//   } catch (error) {
//     res.status(400).send("ERROR: " + error.message);
//   }
// });


// STEP 2: ADD VALIDATION + OWNERSHIP CHECK

// requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
//   try {
//     const loggedInUser = req.user;
//     const { status, requestId } = req.params;

//     const allowedStatuses = ["accepted", "rejected"];
//     if (!allowedStatuses.includes(status)) {
//       throw new Error("Invalid status");
//     }

//     const connectionRequest = await ConnectionRequestModel.findOne({
//       _id: requestId,
//       toUserId: loggedInUser._id,
//     });

//     if (!connectionRequest) {
//       throw new Error("Request not found");
//     }

//     connectionRequest.status = status;
//     await connectionRequest.save();

//     res.send("Updated");

//   } catch (error) {
//     res.status(400).send("ERROR: " + error.message);
//   }
// });


// STEP 3: ADVANCED REVIEW REQUEST (FINAL VERSION)
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // Step 1: Validate allowed statuses
      const allowedStatuses = ["accepted", "rejected"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status or Status not allowed",
          success: false,
        });
      }

      // Step 2: Ensure request belongs to logged-in user and is pending
      const connectionRequest = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "intrested",
      });

      if (!connectionRequest) {
        return res.status(404).json({
          message: "Request not found",
          success: false,
        });
      }

      // Step 3: Update status
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      // Step 4: Response
      res.status(200).json({
        message: "Connection request " + status,
        data,
        success: true,
      });

    } catch (error) {
      res.status(400).send("ERROR: " + error.message);
    }
  }
);


module.exports = requestRouter;