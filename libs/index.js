const express = require("express"); // Includes express as constant var express 
const app = express(); // app is an instance of express.
const port = 3000; // Const port var
const path = require("path"); // To get path to files
const fs = require("fs"); // Dealing with files
const ejs = require('ejs'); // Template system to display files - https://ejs.co/

// Estabilshes "files" as a folder named "/files"
app.use("/data", express.static("./data")); // now able to access /data in ejs files

// app.METHOD(PATH, HANDLER)
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.

// Home
app.get("/", (req, res) => { // Using "get" method, at directory "/" (index) - lambda function that takes "req" (request) and "res" (response)
    res.render("index.ejs") // Responds by rendering index.ejs file
})

// Files
app.get("/data", (req, res) => { // Goes to /data
    let files = fs.readdirSync("./data/"); // Every time the site is reloded it will list new files :)
    res.render("files.ejs", { files }); // renders files.ejs under root/views/files.ejs - and sends files[] to the var
});


// Onready
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})