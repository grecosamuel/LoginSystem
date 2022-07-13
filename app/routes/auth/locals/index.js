// Required Modules
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();



router.get("/", (req, res, next) => {
    res.render("localsForm", {
        pageTitle: "Locals"
    });
})

router.post(
    "/signup",
    passport.authenticate("local-signup",   
    {
        session: false,
        failureRedirect: "/auth/locals"
    }),
    (req, res, next) => {
        res.json({
            user: req.user
        });
});


router.post(
    "/signin",
    passport.authenticate("local-signin",
    {
        session: false,
        failureRedirect: "/auth/locals/",
     }),
    (req, res, next) => {
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
                res.cookie("access-token", token, {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true
                });
                res.json({token});
            } 
        );
});

module.exports = router;