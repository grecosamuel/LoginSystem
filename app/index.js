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
const path = require("path");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./config/middleware/auth");


// Load .env config
dotenv.config();


// Express Config
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static("public"))
app.use(cookieParser());

// Mongoose Connection
db.connect(process.env.MONGODB_URL);

// Passport Config
passport.initialize();
passportConfig(passport);

// Routes 
app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
    res.render("home", {
        pageTitle: "Home"
    });
})

app.get("/user/private", verifyToken, (req, res, next) => {
    res.json({"Status" : "Accepted"});
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server started on :${PORT}...`);
});

