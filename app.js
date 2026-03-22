// const express=require("express");
// const app=express()

// ----------EPISODE 4(ROUTING AND REQUEST)

//using app.use() method to define routes
// app.use("/hello", (req, res) => {
//     res.send("Hello from /hello route");
// });
// app.use("/test", (req, res) => {
//     res.send("This is the /test route");
// });
// app.use("/goodbye", (req, res) => {
//     res.send("Goodbye from /goodbye route");
// });

// // ✅ root route LAST
// app.use("/", (req, res) => {
//     res.send("Hello from the root route");
// });
// app.listen(7000, () => {
//     console.log("Server is running on http://localhost:7000");
// });

//NOTE:-
//as we have done changes in script file,so we just have to type "npm run dev" in terminal 
//to see the changes reflected in the browser without restarting the server manually.:) 



// working after installing POSTMAN
//1.using app.get() method instead of app.use() method to define routes
// app.get("/hello", (req, res) => {
//     res.send("Hello from /hello route");
// });

// app.get("/test", (req, res) => {
//     res.send("This is the /test route");
// });

// app.get("/goodbye", (req, res) => {
//     res.send("Goodbye from /goodbye route");
// });
// // ✅ root route LAST
// app.get("/", (req, res) => {
//     res.send("Hello from the root route");
// });

// app.listen(9000, () => {
//     console.log("Server is running.");
// });

// pushing user using get method
// app.get("/user", (req, res) => {
// res.send({firstName: "Mani", lastName: "Mishra"});
// });
// app.use("/test", (req, res) => {
//     res.send("This is the /test route");
// });

// app.listen(11000, () => {
//     console.log("Server is running at http://localhost:11000");
// });

// ******* (:MAIN SYSTEM:) ******* //

//(i)
// app.use(express.json());
// app.post("/user", (req, res) => {
//     console.log(req.body);
//     res.send("User created");
// });
// app.listen(7000, () => {
//     console.log("Server is running...");
// });

//(ii)
// app.use(express.json());
// app.post("/user", (req, res) => {
//     console.log(req.body);

//     res.status(201).json({
//         message: "User created successfully",
//         data: req.body
//     });
//     });
//     app.listen(7000, () => {
//     console.log("Server is running...");
// });

// what is happening here?
// => We are using express.json() middleware to parse the JSON body of the request.
// => When a POST request is made to /user with a JSON body,
//  we log the body to the console and send a response "User created".






//2. route parameters
// app.get("/user/:id", (req, res) => {
//     const userId = req.params.id;
//     res.send(`User ID: ${userId}`);
// });
// app.get("/product/:category/:id", (req, res) => {
//     const Electronics = req.params.category;
//     const Mouse = req.params.id;
//     res.send(`Category: ${Electronics}, Product ID: ${Mouse}`);
// });

// app.listen(2000, () => {
//     console.log("Server is running at http://localhost:2000.");
// });


//3. Query parameters
// app.get("/search", (req, res) => {
//     const query = req.query.q;   
//     res.send(`Search query: ${query}`);
// });
// app.get("/filter", (req, res) => {
//     const type = req.query.type;
//     const sortBy = req.query.sortBy;
//     res.send(`Filter Type: ${type}, Sort By: ${sortBy}`);
// });
// app.listen(7000, () => {
//     console.log("Server is running.");
// });


//5. Combining route and query parameters
// app.get("/user/:id/posts", (req, res) => {
//     const userId = req.params.id;    
//     const sortBy = req.query.sortBy;
//     res.send(`User ID: ${userId}, Sort By: ${sortBy}`);
// });
// app.listen(7000, () => {
//     console.log("Server is running.");
// });





// handling different HTTP methods for the same route
// app.get("/data", (req, res) => {
//     res.send("GET request to /data");
// });
// app.post("/data", (req, res) => {
//     res.send("POST request to /data");
// });
// app.put("/data", (req, res) => {
//     res.send("PUT request to /data");
// });
// app.delete("/data", (req, res) => {
//     res.send("DELETE request to /data");
// });
// app.listen(7000, () => {
//     console.log("Server is running at http://localhost:7700.");
// });


// 1.+(plus)
// app.get('ab/c', (req, res) => {
//     res.send('Matched route with /ab+c');
// }
// );

// ?
// app.get('/ab?c', (req, res) => {
//   res.send('Route matched: /ab?c');
// });

// *
// app.get('/a*cd', (req, res) => {
//   res.send('Route matched: /a*cd');
// });

// /
// app.get(/a/, (req, res) => {
//   res.send('Route matched any path containing "a"');
// });

// app.listen(7700, () => {
//     console.log("Server is running at http://localhost:7700");
// });



//-------------------- EPISODE 5(MIDDLEWARES AND ERROR HANDLERS IN EXPRESS)
//1.
// app.get('/example', (req, res, next) => {
//   console.log('First handler');
//   next(); // Pass control to the next handler
// }, (req, res) => {
//   res.send('Second handler');
// });

//2.
// app.get('/skip', (req, res, next) => {
//   console.log('This handler will be skipped');
//   next('route'); // Skips to the next matching route handler
// }, (req, res) => {
//   res.send('You will not see this response because the handler is skipped');
// });

// Next matching route handler
// app.get('/skip', (req, res) => {
//   res.send('Skipped to this route handler');
// });
// app.listen(7000, () => {
//   console.log('Server is running at http://localhost:7000');
// });


//3.Example of Middleware Flow

// Middleware 1: Request Logger
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url}`);
//   next(); // Pass control to the next middleware
// });

// Middleware 2: Authorization Check
//Handle user authentication for all admin routes using middlewares
// app.use("/admin", (req, res, next) => {
//     const token = "999";
//     const isAuthorizedAdmin = token === "999";
//     if (!isAuthorizedAdmin) {
//         res.status(401).send("Unauthorized Admin")
//     } else {
//         next();
//     }
// })
// app.get("/admin/getAllData", (req, res) => {
//     res.send("All data Generated")
// })
// app.get("/admin/deleteData", (req, res) => {
//     res.send("Data Deleted")
// })
// app.listen(3000, () => console.log('Server is running on port 3000'));


///app.use() vs app.all()
//
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 




// -------------EPISODE 6  (Databse, Schema & Models | Mongoose)
// all contents shifted to src folder..:)

// ---------CONNECTING DATABASE
// const express=require("express");
// const connectDB=require("./src/config/database");
// const app=express();

// const connectDB=async()=>{
//     await mongoose.connect("mongodb+srv://NamasteDev:sYYgIhUzVmHzDX3Q@namastenode.esecg3t.mongodb.net/devTINDER"
//     );
// };

// connectDB()
//     .then(()=>{
//         console.log("database successfully connected");
//     app.listen(7777,()=>{
//   console.log("Server is running on port 7777");
// });
// })
//     .catch((err) => {
//         console.error("db cannot be connected")
//     });

//--------------------AFTER EPISODE 6 (DATABASE, SCHEMA & MODELS | MONGOOSE)

//Core dependencies
// const express=require("express")
// const connectDB=require("./src/config/database")
// const User=require("./src/models/users")
// const {validateSignupData}=require("./src/utils/validations")
// const bcrypt=require("bcrypt")
// const app=express()
//Middleware: parses JSON request body -> req.body
// app.use(express.json())
// const cookieParser=require("cookie-parser")
// app.use(cookieParser())

//-------------------------------- SIGNUP API --------------------------------
//Concept:
//1. Validate request data
//2. Hash password using bcrypt
//3. Save user in MongoDB
//4. Never store plain passwords

// app.post("/signup",async(req,res)=>{
//   try{
//     const {firstName,lastName,email,password}=req.body
//     if(!firstName||!lastName||!email||!password){
//       return res.status(400).send("All fields are required")
//     }
//     const passwordHash=await bcrypt.hash(password,10)
//     const user=new User({
//       firstName,
//       lastName,
//       email,
//       password:passwordHash
//     })
//     console.log(passwordHash);
//     await user.save()
//     res.send("User added successfully")
//   }catch(err){
//     res.status(400).send("Error saving the user: "+err.message)
//   }
// })

//-------------------------------- LOGIN API --------------------------------
//Concept:
//1. Find user using email
//2. Compare plaintext password with hashed password
//3. bcrypt.compare() returns true/false
// const jwt = require("jsonwebtoken");
// app.post("/login", async (req,res)=>{
//   try{
//     const {email,password}=req.body
//     const user=await User.findOne({email})
//     if(!user){
//       throw new Error("Invalid Credentials")
//     }
//     const isPasswordValid=await bcrypt.compare(password,user.password)
//     if(!isPasswordValid){
//       throw new Error("Invalid Credentials")
//     }
//     const token=jwt.sign({_id:user._id},"SECRET_KEY")
//     res.cookie("token",token)
//     res.send("Login Successful")
//   }catch(err){
//     res.status(400).send("ERROR "+err.message)
//   }
// })

//-------------------------------- GET USERS BY EMAIL --------------------------------
//Concept:
//Query parameters -> req.query
//Example:
//GET /feed?email=test@gmail.com
//feed is protected. Only logged in users can access it.
// const userAuth = require("./src/middlewares/auth")

// app.get("/feed", userAuth , async(req,res)=>{
//   try{

//     const {email} = req.query

//     if(!email){
//       return res.status(400).send("email query parameter is required")
//     }

//     const users = await User.find({email})

//     res.send(users)

//   }catch(err){
//     res.status(500).send("Something went wrong")
//   }
// })
//-------------------------------- DELETE USER --------------------------------
//Concept:
//Delete document using MongoDB ObjectId

// app.delete("/user",async(req,res)=>{
//   const userId=req.body.userId
//   try{
//     await User.findByIdAndDelete({_id:userId})
//     res.send("User deleted Successfully")
//   }catch(err){
//     res.status(400).send("Something went wrong")
//   }
// })

//-------------------------------- UPDATE USER --------------------------------
//Concept:
//PATCH updates partial data
//Allow only specific fields to update

// app.patch("/user/:userId",async(req,res)=>{
//   const userId=req.params.userId
//   const data=req.body
//   try{
//     const ALLOWED_UPDATES=["url","about","gender","email","password","skills","age"]
//     const isUpdateAllowed=Object.keys(data).every((key)=>ALLOWED_UPDATES.includes(key))
//     if(!isUpdateAllowed){
//       throw new Error("Updates are not allowed")
//     }
//     const user=await User.findByIdAndUpdate(userId,data,{returnDocument:"before"})
//     if(!user){
//       return res.status(404).send("User not found")
//     }
//     res.send("User updated successfully")
//   }catch(err){
//     res.status(400).send("Something went wrong")
//   }
// })

//-------------------------------- GET USER BY EMAIL --------------------------------
//Concept:
//Find a single document using findOne()

// app.get("/user",async(req,res)=>{
//   const userEmail=req.body.emailId
//   try{
//     const user=await User.findOne({emailId:userEmail})
//     if(!user){
//       return res.status(404).send("User not found")
//     }
//     res.send(user)
//   }catch(err){
//     res.status(500).send("Something went wrong")
//   }
// })

//ADDING PROFILE ROUTE
// app.get("/profile", userAuth , async (req,res)=>{
//   try{
//   const user = req.user
//     res.send(user)
//   }catch(err){
//     res.status(500).send("Something went wrong")
//   }
// })


//-------------------------------- DATABASE CONNECTION --------------------------------
//Concept:
//1. Connect MongoDB using mongoose
//2. Start server only after DB connection succeeds


//THE LAST DANCE:
const express = require("express");
const connectDB = require("./src/config/database");
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config({});
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//database connect before server
connectDB().then(() => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ` + process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
});
