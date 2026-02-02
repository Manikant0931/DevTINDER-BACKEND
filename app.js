const express = require('express');
const app = express();

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

// app.listen(7000, () => {
//     console.log("Server is running on http://localhost:7000");
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
//     const category = req.params.category;
//     const productId = req.params.id;
//     res.send(`Category: ${category}, Product ID: ${productId}`);
// });

// app.listen(7000, () => {
//     console.log("Server is running.");
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






//.
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
//     console.log("Server is running on http://localhost:7000");
// });




