const jwt = require("jsonwebtoken");


async function verifyToken( req, res, next ) {

    let token  = req.cookies['access-token'];
    if (token == undefined) {
        return res.status(401).send("Unauthorized").end();
    }
    else {

        try {
            let decoded = jwt.verify(token, "secretKey");
            next();
        }
        catch (err) {
            return res.status(401).send("Unauthorized").end();
        }
    }


}


module.exports.verifyToken = verifyToken;