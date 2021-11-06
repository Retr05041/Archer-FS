const express = require("express"); // Includes express as constant var express 
const app = express(); // app is an instance of express.
const port = 3000; // Const port var
const path = require("path"); // To get path to files
const fs = require("fs"); // Dealing with files
const ejs = require("ejs"); // Template system to display files - https://ejs.co/
const multer = require("multer"); // Uploading files to /data
const cookieParser = require("cookie-parser"); // For generating cookies on login
const crypto = require("crypto") // For Hashing pass and user

// Temp user and pass before adding database
const USERNAME = "root";
const PASSWORD = "root";

// Estabilshes "files" as a folder named "/files"
app.use("/data", express.static("./data")); // now able to access /data in ejs files
// For accessing the Login folder
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// So it sees CSS files
app.use(express.static("./static"));

// For use of cookies
app.use(cookieParser());

// Function for hashing creds
function hashedCredentials(username, password) {
    return crypto.createHash('sha512').update(username + password).digest('hex'); // "digest" is the output of hash function containingonly hexadecimal digits
}

// This was taken by - https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "data/"); // Changed file to my file name
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Edited this for my own purposes
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
    let hashed = hashedCredentials(USERNAME, PASSWORD);
    // Checks if the cookie "LoggedInUser" is True, if it does it allows them in, if its not it doesnt let them in
    let cookie = req.cookies.LoggedInUser;
    if (cookie == hashed) {
        let files = fs.readdirSync("./data/"); // Every time the site is reloded it will list new files :)
        res.render("files.ejs", { files }); // renders files.ejs under root/views/files.ejs - and sends files[] to the var
    } else {
        res.redirect("/")
    }
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

// Login
app.post("/", (req, res) => {
    let username = req.body.username; // Gets username
    let password = req.body.password; // Gets password
    if (username == USERNAME && password == PASSWORD) {
        let hashed = hashedCredentials(username, password);
        // Generates a cookie of the login is correct "LoggedInUser" - taken from https://stackoverflow.com/questions/16209145/how-to-set-cookie-in-node-js-using-express-framework
        // Edited a little to fit my needs better
        res.cookie("LoggedInUser", hashed, { maxAge: 300000, httpOnly: true }); // Lasts for 10 min
        console.log("cookie created successfully");
        // end of their code
        console.log(username + " has logged in."); // Simple log
        res.redirect("/data"); // Logs in if user and pass are "root"
    } else {
        res.redirect("/") // Else it just resets :)
    };
});

// Delete function - Had help from Matthew
app.delete("/data", (req, res) => {
    let fileName = req.query.fileName
    let files = fs.readdirSync("./data/");

    if (!fileName) return res.status(400).send("Incorrect File");

    if (files.includes(fileName)) {

        let target = path.join("data", fileName);

        fs.unlinkSync(target);
        res.status(200).send();

    } else {
        res.status(404).send("File not found");
    }

});

// Onready
app.listen(port, () => {
    console.log(`Server up at http://localhost:${port}`);
})