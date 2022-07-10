// Required Modules
const express = require("express");
const passport = require("passport");
const router = express.Router();
const locals = require("./locals");

router.use("/locals", locals);



module.exports = router;
