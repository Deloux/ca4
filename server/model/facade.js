var mongoose = require('mongoose');
var db = require('./db.js');

function _getWiki(title, callback){
    db.WikiModel.find({'title': title}, function(err, wiki){
        if(err){
            return callback(err);
        }else{
            return callback(null, wiki);
        }
    });
}

function _getWikis(callback){
    db.WikiModel.find(function(err, wikis){
        if(err){
            return callback(err);
        }else{
            return callback(null, wikis);
        }
    })
}

function _findWiki(searchString, callback){
    db.WikiModel.find({'title': {'$regex': searchString, '$options': 'i'}}, function(err, wikis){
        if(err){
            return callback(err);
        }else{
            return callback(null, wikis);
        }
    })
}

function _getCategories(){

}

function _getWikisWithCategory(category){

}

module.exports = {
    findWiki: _findWiki,
    getWiki: _getWiki,
    getWikis: _getWikis,
    findWiki: _findWiki,
    getCategories: _getCategories,
    getWikisWithCategory: _getWikisWithCategory
}