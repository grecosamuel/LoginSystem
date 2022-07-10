// Required Modules
const mongoose = require("mongoose");
const { Schema } = mongoose;


// Create User Schema
const userSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create Model 
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;