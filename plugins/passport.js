import {User} from "../definitions/User";
const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
const { hashPassword, validatePassword } = require("../definitions/utilities");
import { client } from "./mongo";
const users = client.db("campuscentral").collection("users");

passport.use(new LocalStrategy(
    function(email, password, done) {

        users.findOne({ email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // the user exists
            const u = User.fromJSON(user);
            validatePassword(password, u.passwordHash).then(function (correct){
                if (correct){
                    return done(null, u);
                }
                else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            })



        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    users.findById(id, function(err, user) {
        done(err, User.fromJSON(user));
    });
});
