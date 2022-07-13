// Required Modules
const express = require("express");
const passport = require("passport");
const router = express.Router();
const locals = require("./locals");
const google = require("./google");

router.use("/locals", locals);
router.use("/google", google);


module.exports = router;
