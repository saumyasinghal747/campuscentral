const {User} = require ("../definitions/internal");
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const { hashPassword, validatePassword } = require("../definitions/utilities");

const smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

router.post('/signup', async function(req, res, next) {
    // create user lol
    const {email, password, firstName, lastName} = req.body;

    const passwordHash = await hashPassword(password);

    const user = await User.create({
        email, passwordHash, firstName, lastName
    })

    res.signIn(user); // the middleware stores a cookie based on the user object
    // gonna end with a redirect to the add institution page

    res.redirect('/');

    // now we send the user a verification email.



});

router.post('/signout', async function(req, res, next){
    res.signOut();
    res.redirect(req.referrer||'/'); // TODO: implement redirects to origin
})

module.exports = router;
