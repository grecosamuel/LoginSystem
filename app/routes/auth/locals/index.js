// Required Modules
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/signup", passport.authenticate("local-signup", { session: false }), (req, res, next) => {
    res.json({
        user: req.user
    });
});


router.post("/signin", passport.authenticate("local-signin", { session: false }), (req, res, next) => {

    jwt.sign(
        { user: req.user },
        'secretKey',
        { expiresIn: '1h' },
        (err, token) => {
            if (err) {
                return res.json({
                    message: "Failed to login",
                    token: null
                });
            }
            res.json({token});
        } 
    );
});

module.exports = router;