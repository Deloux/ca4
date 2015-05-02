global.TEST_DATABASE = "mongodb://localhost/ca4test";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var db = require('../../server/model/db.js');
var querystring = require('querystring');

describe('REST API for /getWiki', function () {
  before(function (done) {
      testServer = app.listen(testPort, function () {
      console.log("Server is listening on: " + testPort);
      done();
    })
    .on('error',function(err){
        console.log(err);
      });
  })

  beforeEach(function(done){
      var array = [{title : "Test wiki",
          url :"www.test.dk",
          abstract: "Lorem ipsum dolor sit",
          categories: ['cat1', 'cat2'],
          headings: [{heading: 'Test heading', position: 1}, {heading: 'Test heading 2', position: 2}]
      }];
      db.Wiki.create(array,function(err){
          done();
      });
  })

  after(function(){
      mongoose.connection.db.dropDatabase();
      testServer.close();
  })

  it("Should return json object of wiki based on title", function (done) {

      var query = querystring.stringify({
          'title' : 'Test wiki'
      });

      var options = {
          hostname: 'localhost',
          port: testPort,
          path: '/api/getWiki'+query,
          method: 'GET',
          headers: {
              'Content-Type': 'JSON'
          }
      };

      http.request(options, function(res) {
          res.setEncoding('utf8');
          res.on('data', function (chunk) {
              var wiki = JSON.parse(chunk);
              wiki.should.be.json;
              wiki.title.should.equal('Test wiki');
              wiki.abstract.should.equal('Lorem ipsum dolor sit');
              wiki.categories.length.should.equal(2);
              wiki.headings.length.should.equal(2);
              wiki.headings[0].should.be.an.instanceOf(Object);
              done();
          });
      });
  });
});
