var request = require("request");
var fs = require("fs");
var path = require("path");
var renderme = require("renderme");
var FindURLs = require(path.join(__dirname,"../controllers","findURLs.server.js"));
require("dotenv").load();

module.exports = function (app,db) {

  var findURLs = new FindURLs(db);

  // Visiting the service at / serves up the README.md file
  app.route("/").
    get(function(req,res) {
      renderme({
        readme: fs.readFileSync(path.join(__dirname,"../..","README.md"),'utf-8'),
        readmeFilename: 'README.md'
        },
        function rendered(err, html) {
          if (err) { throw err; }
          else {
            res.end(html);
          }
        }
      );
    });

  // Users can create a new route by adding the full url to /new/
  app.route("/new/:protocol//:path").
    get(function(req,res) {

      // Put together full url
      var newURL = req.params.protocol + "//" + req.params.path;

      // First decide if the passed url is valid by requesting it

      request(newURL,function(err,response,body) {
        if (!err && response.statusCode == 200) {

          // The response was valid, so connect to the database to return a JSON-formatted string
          // describing the original url and its shortened route

          findURLs.insertURL(newURL,function(result) {
            var reply = {
              "original_url": result.original_url,
              "short_url": process.env.APP_URL + "/" + result.route
            }
            res.end(JSON.stringify(reply));
          });
        }
        else {
          var reply = {
            "error": "Invalid URL"
          };
          res.end(JSON.stringify(reply));
        }
      });
    });

  app.route("/new/:badurl").
    get(function(req,res) {
    var reply = {
      "error": "Invalid URL"
    };
    res.end(JSON.stringify(reply));
  });

  app.route("/new/:badprotocol/:badurl").
    get(function(req,res) {
      var reply = {
        "error": "Invalid URL"
      };
      res.end(JSON.stringify(reply));
    });

  app.route("/:shortened").
    get(function(req,res) {
      findURLs.getURL(req.params.shortened,function(result) {
        if (!result) {
          var reply = {
            "error": "Did not find route for /" + req.params.shortened
          };
          res.end(JSON.stringify(reply));
        }
        else {
          res.redirect(301,result.original_url);
        }
        // db.close();
      })
  });

};
