const express = require("express"); // Includes express as constant var express 
const app = express(); // app is an instance of express.
const port = 3000; // Const port var

const path = require("path");
const fs = require("fs");
const files = fs.readdirSync("libs/files/");


// app.METHOD(PATH, HANDLER)
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.

// Home
app.get("/", (req, res) => { // Using "get" method, at directory "/" (index) - lambda function that takes "req" (request) and "res" (response)
    res.sendFile("index.html", { root: "./libs/static" }); // Responds by sending index.html file
})

// Files
app.get("/files", (req, res) => {
    for (let file of files) {
        console.log(file);
    }
});


// Onready
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})