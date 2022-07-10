// Required Modules
const mongoose = require("mongoose");


const connect = async (dbUrl) => {

    mongoose.connect(
        dbUrl,
       {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       });

    const db = mongoose.connection;

    db.on("error", () => {
        console.log(`Error while connection...`);
    });

    db.on("open", () => {
        console.log(`Database connected...`);
    });

};



module.exports = { connect };
