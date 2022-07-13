const jwt = require("jsonwebtoken");


async function verifyToken( req, res, next ) {

    let token  = req.cookies['access-token'];
    if (token == undefined) {
        return res.status(401).send("Unauthorized").end();
    }
    else {

        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user_data = decoded;
            next();
        }
        catch (err) {
            return res.status(401).send("Unauthorized").end();
        }
    }
};

async function checkAuthenticated( req, res, next ) {
    if (req.isAuthenticated()) return next();
    return res.status(401).send("Unauthorized").end();
};


module.exports.verifyToken = verifyToken;
module.exports.checkAuthenticated = checkAuthenticated;