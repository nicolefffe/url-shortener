"use strict";
var assert = require("assert");
var path = require("path");

function handleURLs(db) {
  var urls = db.collection("urls");

  this.insertURL = function(newURL,callback) {
    urls.findOne(
      {original_url: newURL},
      {original_url: 1,route: 1,_id: 0},
      function (err,result) {
        if (err) { throw err; }
        if (result) {
            callback(result);
        }
        else {

          var urls = db.collection("urls");
          var length = 4;
          var newRoute;

          while (newRoute == undefined) {
            newRoute = "";
            for (var i = 0; i < length; i++) {
              newRoute += String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
            }
            console.log("created route: " + newRoute);

            urls.findOne({route: newRoute},
              function (err,result) {
              if (err) { throw err; }
              else {
                if (result) {
                  newRoute = undefined;
                }
              }
            });
          }

          urls.insert(
            {original_url: newURL,
             route: newRoute},
            function(err) {
              if (err) { throw err; }
              else {
                urls.findOne(
                  {original_url: newURL},
                  {original_url: 1,route: 1,_id: 0},
                  function(err,result) {
                    if (err) { throw err; }
                    else {
                      console.log("insertURL says: " + JSON.stringify(result));
                      callback(result); }
                });
              }
          });
        }
    });
  };

  this.getURL = function(shortened,callback) {
    urls.findOne(
      {route:shortened},
      {original_url: 1,route: 1,_id: 0},
      function(err,result) {
        if (err) { throw err; }
        else {
          if (result) {
            console.log("found route for original url");
            callback(result);
          }
          else {
            console.log("did not find route");
            callback(result);
          }
        }
      });
  };

}

module.exports = handleURLs;

