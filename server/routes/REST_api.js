var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var dbFacade = require('../model/facade.js');
var db = require('../model/db.js');
var bodyParser = require('body-parser');

/* GET A User From The DataBase */
router.get('/user', function(req, res) {
  if(typeof global.mongo_error !== "undefined"){
    res.status(500);
    res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
    return;
  }
  user.find({}, function (err, users) {
    if (err) {
      res.status(err.status || 400);
      res.end(JSON.stringify({error: err.toString()}));
      return;
    }
    res.header("Content-type","application/json");
    res.end(JSON.stringify(users));
  });
});

router.get('/getWiki/:title', function(req, res) {

    if(typeof global.mongo_error !== "undefined"){
        console.log('2');
        res.status(500);
        res.end("Error: "+global.mongo_error);
        return;
    }
    dbFacade.getWiki(req.params.title, function(err, wiki){
        if(err){
            console.log('3');
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }else{
            console.log('4');
            res.json(wiki);
        }
    });
});


router.get('/findWiki/:title', function(req, res) {

    if(typeof global.mongo_error !== "undefined"){
        console.log('2');
        res.status(500);
        res.end("Error: "+global.mongo_error);
        return;
    }
    dbFacade.findWiki(req.params.title, function(err, wikis){
        if(err){
            console.log('3');
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }else{
            console.log('4');
            res.json(wikis);
        }
    });
});

router.get('/getWikis', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error);
        return;
    }
    dbFacade.getWikis(function(err, data){
        if(err){
            console.log('3');
            res.status(err.status || 400);
            res.end(JSON.stringify({error: err.toString()}));
            return;
        }else {
            console.log('sending');
            res.json(data);
        }
    })
    /*db.WikiModel.find(function(err, wikis){

    })*/
});




module.exports = router;
