const express = require('express');
const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello from /hello route");
});

app.get("/test", (req, res) => {
    res.send("This is the /test route");
});

app.get("/goodbye", (req, res) => {
    res.send("Goodbye from /goodbye route");
});

// ✅ root route LAST
app.get("/", (req, res) => {
    res.send("Hello from the root route");
});

app.listen(7000, () => {
    console.log("Server is running on http://localhost:7000");
});


