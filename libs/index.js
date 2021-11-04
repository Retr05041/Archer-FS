const express = require("express"); // Includes express as constant var express 
const app = express(); // app is an instance of express.
const port = 3000; // Const port var
const path = require("path"); // To get path to files
const fs = require("fs"); // Dealing with files
const ejs = require('ejs'); // Template system to display files - https://ejs.co/
const multer = require('multer'); // Uploading files to /data

// Estabilshes "files" as a folder named "/files"
app.use("/data", express.static("./data")); // now able to access /data in ejs files

// This was taken by - https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "data/"); // Changed file to my file name
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + path.extname(file.originalname));
    }
});
// End of their code

// app.METHOD(PATH, HANDLER)
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.

// Home
app.get("/", (req, res) => { // Using "get" method, at directory "/" (index) - lambda function that takes "req" (request) and "res" (response)
    res.render("index.ejs") // Responds by rendering index.ejs file
})

// Data
app.get("/data", (req, res) => { // Goes to /data
    let files = fs.readdirSync("./data/"); // Every time the site is reloded it will list new files :)
    res.render("files.ejs", { files }); // renders files.ejs under root/views/files.ejs - and sends files[] to the var
});

// Upload Data - Taken from https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
app.post("/upload-data", (req, res) => {
    let upload = multer({ storage: storage}).single("uploadData"); // Sets our storage to the storage set above

    upload(req, res, function(err) { // Uploads if there are no errors
    
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select data to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.redirect("/data"); // I added the redirect back to data on success
    });
});
// End of their code

// Delete function - Had help from Matthew
app.delete("/data", (req, res) => {
    let fileName = req.query.fileName
    if (!fileName) return res.status(400).send("Incorrect File");
    let target = path.join("data", fileName); // DANGEROUS DONT FUCK WITH - FIX THIS PLEASE
    if (!fs.existsSync(target)) return res.status(404).send("File not found");
    fs.unlinkSync(target);
    res.status(200).send();
    
});

// Onready
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})