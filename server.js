'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongo = require("mongodb").MongoClient;
require("dotenv").load();

var app = express();

mongo.connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/", function(err,db) {
  if (err) { throw err; }

  else { console.log("Connected to mongodb"); }

  routes(app,db);

  var port = process.env.PORT || 8080;

  app.listen(port,  function () {
	  console.log('Node.js listening on port ' + port + '...');
  });

});


