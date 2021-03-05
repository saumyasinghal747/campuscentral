const express = require('express');
const router = express.Router();
//const { client } = require('./../plugins/mongo');
//const { User } = require("../definitions/internal");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals = {
    title: 'Campus Central',
    user:req.ME
  }
  try {
    res.render('pages/index', {});
  }
  catch (e){
    // eh
  }
});

router.get('/signup', function(req, res, next){
  res.locals.title='Campus Central';

  try {
    res.render('pages/signup', {});
  }
  catch (e){
    // eh
  }
})


router.get('/signout', function(req, res, next){
  res.locals.title='Campus Central';
  try {
    res.render('pages/signout', {});
  }
  catch (e){
    // eh
  }
})



module.exports = router;
