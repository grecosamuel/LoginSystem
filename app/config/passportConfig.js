// Required Modules
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
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

                if (!user) return done(null, false, {nologin: "User not exist!"});

                const isMatch = await user.matchPassword(password);
                if (!isMatch) return done(null, false, {nologin: "Wrong password!"});

                user.password = undefined;
                return done(null, user);


            }
            catch (err) {
                return done(err, false);
            }
        }
    )
    );



    // Google Strategy
    passport.use(
        "google-signin",
        new GoogleStrategy({
            clientID: "268561289617-dspgh8jrdj45caaepv74k72bjgduhlfq.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "/auth/google/callback",
            passReqToCallback: true,
        },
        (request, accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        })
    );


    // Serialize - Deserialize
    passport.serializeUser( (user, done) => {
        done(null, user)
     });
    passport.deserializeUser((user, done) => {
       done (null, user)
     })
};
