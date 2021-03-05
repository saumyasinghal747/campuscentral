import {User} from "../definitions/User";

const jwt = require('jsonwebtoken');
const jwtkey = process.env.JWT_KEY;
module.exports = function (req, res, next) {

    // check the cookies to extract the jwt token, setting req.ME

    const { token } = req.cookies;
    // if it is there then set req.user
    if (token) {
        try {
            // TODO: this would be a good time to convert the json back to a user
            req.ME = User.fromJSON(jwt.verify(token, jwtkey));
            res.locals.user = req.ME;
        }
        catch (err){
            // token is invalid, remove it from the cookies
            res.clearCookie('token')
        }
    }

    // setting res.signIn()

    res.signIn = function (user:User) {
        res.cookie('token', jwt.sign(user.toJSON(), jwtkey));
        // then the router can redirect somewhere, so the token will move to req.
    }

    // TODO: implement sign in with email and password function

    res.signInWithEmailAndPassword = function (email:string, password:string) {
        // query for the user
    }

    res.signOut = function (){
        res.clearCookie('token')
    }

    next();
}
