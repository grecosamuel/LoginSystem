// Required Modules
const express = require("express");
const router = express.Router();
const googleRoutes = require("./google");
const localRoutes = require("./locals");

// Routes
router.use("/google", googleRoutes);
router.use("/locals", localRoutes);


module.exports = router;