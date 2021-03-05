"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../definitions/User");
var jwt = require('jsonwebtoken');
var jwtkey = process.env.JWT_KEY;
module.exports = function (req, res, next) {
    // check the cookies to extract the jwt token, setting req.ME
    var token = req.cookies.token;
    // if it is there then set req.user
    if (token) {
        try {
            // TODO: this would be a good time to convert the json back to a user
            req.ME = User_1.User.fromJSON(jwt.verify(token, jwtkey));
            res.locals.user = req.ME;
        }
        catch (err) {
            // token is invalid, remove it from the cookies
            res.clearCookie('token');
        }
    }
    // setting res.signIn()
    res.signIn = function (user) {
        res.cookie('token', jwt.sign(user.toJSON(), jwtkey));
        // then the router can redirect somewhere, so the token will move to req.
    };
    // TODO: implement sign in with email and password function
    res.signInWithEmailAndPassword = function (email, password) {
        // query for the user
    };
    res.signOut = function () {
        res.clearCookie('token');
    };
    next();
};
