// Required Modules
const express = require("express");
const { verifyToken } = require("../../../config/middleware/auth");
const router = express.Router();

// Routes 
router.get("/", verifyToken, (req, res) => {
    res.render("whoamiLocals", {
        pageTitle: "Whoami Locals",
        user: res.locals.user_data.user
    });
})

module.exports = router;