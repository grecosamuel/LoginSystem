// Required Modules
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt")
const userModel = require("../db/models/userModel");

// Implement Local Strategy
module.exports = (passport) => {

    // Local SignUp
    passport.use("local-signup", 
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },

            async (email, password, done) => {
                try {
                    // Check if user exist
                    const userExist = await userModel.findOne({ "email" : email });

                    if (userExist) return done(null, false);

                    // Create new user
                    const createUser = await userModel.create({email, password});
                    return done(null, createUser);

                }
                catch (err){
                    done(err);
                }
            }

        )
    );

    // Local SignIn
    passport.use("local-signin", 
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },

        async (email, password, done) => {
            try {

                // Check user exist
                const user = await userModel.findOne({email: email});

                if (!user) return done(null, false);

                const isMatch = await user.matchPassword(password);
                if (!isMatch) return done(null, false);

                user.password = undefined;
                return done(null, user);


            }
            catch (err) {
                return done(err, false);
            }
        }
    )
    );


    // JWT Strategy 
    passport.use("jwt-middle",
        new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: 'secretKey',
        },
        async (payload, done) => {
            try {
                const user = payload.user;
                done(null, user);
            }
            catch (err) {
                done(err, false);
            }
        })
    )


};
