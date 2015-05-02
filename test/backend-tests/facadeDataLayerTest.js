global.TEST_DATABASE = "mongodb://localhost/ca4test";

var mongoose = require( 'mongoose' );
var should = require( 'should' );
var facade = require("../../server/model/facade.js");
var db = require("../../server/model/db.js");

describe('Facade data layer', function(){

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

    after(function(){  //Stop server after the test
        mongoose.connection.db.dropDatabase();
    })

    it('Should return wiki based on title', function(done){
        facade.getWiki('Test wiki', function(wiki){
            wiki.title.should.equal('Test wiki');
            wiki.abstract.should.equal('Lorem ipsum dolor sit');
            wiki.categories.length.should.equal(2);
            wiki.headings.length.should.equal(2);
            wiki.headings[0].should.be.an.instanceOf(Object);
        });
        done();
    })
})