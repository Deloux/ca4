var mongoose = require( 'mongoose' );

/*
Note:
To this test project as it is:
Start your MongoDB database.
Start mongo.exe and do:
  use testdb
  db.testusers.insert({userName : "Lars", email :"lam@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})
*/
var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  dbURI = 'mongodb://ca4:ca4@ds063769.mongolab.com:63769/ca4';
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});


var wikiSchema = mongoose.Schema({
        title: { type: String, index: true},
        url: { type: String},
        abstract: { type: String},
        categories: {type: [{type: String}], index: true},
        links: {type: [{type: String}], index: true},
        headings: [{heading: {type: String}, position: {type: Number}}]},
    { collection: 'wiki' }
);

exports.WikiModel = mongoose.model('wiki', wikiSchema);