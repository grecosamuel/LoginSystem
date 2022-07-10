// Required Modules
const mongoose = require("mongoose");
const { Schema } = mongoose;
const argon = require("argon2");

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

// Match Password
userSchema.methods.matchPassword = async function(password){
    try {
        return await argon.verify(this.password, password);
    }
    catch(err) {
        throw new Error(err);
    }
};

// Hash password in pre-save 
userSchema.pre('save', async function(next) {
    try {

        // Check if password is modified
        const user = this;
        if (!user.isModified("password")) next();

        // Hash password
        const hash = await argon.hash(this.password)
        this.password = hash;
        next();
    }
    catch (err) {
        return next(err);
    }
});


// Create Model 
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;