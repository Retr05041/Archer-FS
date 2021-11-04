const express = require("express"); // Includes express as constant var express 
const app = express(); // app is an instance of express.
const port = 3000; // Const port var
const path = require("path"); // To get path to files
const fs = require("fs"); // Dealing with files
const ejs = require('ejs'); // Template system to display files - https://ejs.co/

app.use("/files", express.static("libs/files")); // Estabilshes "files" as a folder named "/files"

// app.METHOD(PATH, HANDLER)
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.

// Home
app.get("/", (req, res) => { // Using "get" method, at directory "/" (index) - lambda function that takes "req" (request) and "res" (response)
    res.sendFile("index.html", { root: "./libs/static" }); // Responds by sending index.html file
})

// Files
app.get("/files", (req, res) => { // Goes to /files (currently no html file there)
    let files = fs.readdirSync("libs/files/"); // Every time the site is reloded it will list new files :)
    res.render("files.ejs", { files }); // renders files.ejs under root/views/files.ejs - and sends files[] to the var
});


// Onready
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})