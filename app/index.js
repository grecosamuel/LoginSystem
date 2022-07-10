// Required Modules
const express = require("express");
const passport = require("passport");
const mongo = require("mongodb");
const dotenv = require("dotenv");
const db = require("./db/dbConnection");

// Load .env config
dotenv.config();


// Express Config
const app = express();
const PORT = process.env.PORT || 3000;

// Mongoose Connection
db.connect(process.env.MONGODB_URL);

// Start Server
app.listen( () => {
    console.log(`Server started on :${PORT}...`);
});

