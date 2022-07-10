// Required Modules
const express = require("express");
const passport = require("passport");
const mongo = require("mongodb");
const dotenv = require("dotenv");
const db = require("./db/dbConnection");
const passportConfig = require("./config/passportConfig");
const bodyParser = require('body-parser'); // parser middleware
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth");

// Load .env config
dotenv.config();


// Express Config
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));

// Mongoose Connection
db.connect(process.env.MONGODB_URL);

// Passport Config
passport.initialize();
passportConfig(passport);

// Routes 
app.use("/auth", authRoutes);


app.post("/user/private", passport.authenticate("jwt-middle", {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on :${PORT}...`);
});

