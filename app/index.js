// Required Modules
const express = require("express");
const passport = require("passport");
const mongo = require("mongodb");
const dotenv = require("dotenv");
const db = require("./db/dbConnection");
const passportConfig = require("./config/passportConfig");
const bodyParser = require('body-parser'); // parser middleware
const jwt = require("jsonwebtoken");


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
app.post(
    "/auth/signup",
    passport.authenticate('local-signup', { session: false }),
    (req, res, next) => {
    // sign up
    res.json({
    user: req.user,
    });
    }
);


app.post(
    "/auth/login",
    passport.authenticate('local-signin', { session: false }),
    (req, res, next) => {
        // login
        jwt.sign({user: req.user}, 'secretKey', { expiresIn: '1h'}, (err, token) => {
            if (err) {
                return res.json({
                    message: "Failed to login",
                    token: null
                });
            }
            res.json({token});
        });
    }
   );

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on :${PORT}...`);
});

