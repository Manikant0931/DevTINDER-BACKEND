const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send("Please Login");
    }
    // Use same secret as used when signing tokens.
    // Prefer `process.env.JWT_SECRET` so set it in your `.env` (example: JWT_SECRET=manim@123)
    const jwtSecret = process.env.JWT_SECRET || "manim@123"; // fallback for local dev
    const decodedObj = jwt.verify(token, jwtSecret);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};
module.exports = {
  userAuth,
};