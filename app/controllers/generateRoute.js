"use strict";

module.exports = function(db) {

  var urls = db.collection("urls");
  var length = 4;
  var route = "";

  for (var i = 0; i < length; i++) {
    route += String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
  }
  console.log("created route: " + route);

  urls.findOne({route: route},
    function (err,result) {
    if (err) { throw err; }
      else {
        if (result) {
          return generateRoute();
        }
        else {
          return route;
        }
      }
    });
}
