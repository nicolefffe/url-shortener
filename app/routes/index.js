var url = require("url");
var jquery = require("jquery");
var mongodb = require("mongodb").MongoClient;

module.exports = function (app) {

  app.get('/', function(request, response) {
    renderme({
      readme: fs.readFileSync(path.join(__dirname,'../..','README.md'),'utf-8'),
      readmeFilename: 'README.md'
      },
      function rendered(err, html) {
        if (err) { throw err; }
        else {
          response.end(html);
        }
      }
    );
  });



};
