// Required Modules
const express = require("express");
const router = express.Router();
const { checkAuthenticated } = require("../../../config/middleware/auth");

// Routes
router.get("/", checkAuthenticated, (req, res) => {
    res.render("whoamiGoogle", {
        pageTitle: "Whoami Google",
        user: req.user
    });
})


module.exports = router;