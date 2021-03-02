const express = require('express');
const router = express.Router();
const {client} = require('./../plugins/mongo');
const {User} = require("../definitions/internal");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Campus Central'});
});

console.log(User.create({
  firstName:"Saumya",
  lastName:"Singhal",
  email:"ss44523@pausd.us"
}))

module.exports = router;
