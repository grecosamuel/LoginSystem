// Required Modules
const { application } = require("express");
const express = require("express");
const passport = require("passport");
const { checkAuthenticated } = require("../../../config/middleware/auth");
const router = express.Router();



router.get("/", passport.authenticate("google-signin", {scope: ["email", "profile"], prompt: "select_account"}), (req, res) => {
    return res.end();
});

router.get('/callback', passport.authenticate( 'google-signin', {
    successRedirect: '/user/private/google',
    failureRedirect: '/user/private/google/error'
 }));

router.post("/logout", checkAuthenticated, (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.status(500);
            res.write("Error while logout");
            return res.end();
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});

module.exports = router;