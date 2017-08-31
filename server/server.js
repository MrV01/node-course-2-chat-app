/////  Set up Chat Application
/// Run:  nodemon  server/server.js
///
/////////////////// Dependencies.
//  npm Express:  npm i express@4.15.4 --save
//  npm morgan:  npm  i  morgan@1.8.2 --save   // HTTP logger

//// Challenge 1. ( DONE successfully )
////  1. Configure brand new Express application.
////   2. Set up static middleware to serve public folder with index.html
////   3. start application  on localhost:3000
////
///  Used  http://hectorcorrea.com/blog/introduction-to-node-js/51 as a template
///  Docs: https://expressjs.com/en/starter/static-files.html
/// NOTE:  console.log(__dirname + './../public');  // Old way to do things, is not used now.
///
// New way to do things:  path.join()   from https://nodejs.org/api/path.html
const path = require('path');  //
const publicPath = path.join(__dirname, '../public');  // runs in server folder
const port = process.env.PORT || 3000;
//  console.log(publicPath);
var express = require('express');
var logger = require('morgan');

var app = express();    // configure

app.use(logger('dev'));   // argument: 'combined' in production

// Serve static files from   public directory, using express.static middleware.
app.use(express.static(publicPath));
/// Or with "mount point" (/static dirextory here):
///                app.use('/static', express.static(path.join(__dirname, 'public')))
//// For one file index.html, (one file per route only) use folllowing:
////  res.sendFile(path.join( publicPath + '/index.html'));

// Route for everything else
app.get('*', function(req, res) {
  res.status(404).sendFile(publicPath + '/404page.html');
});

app.listen(port);
console.log(`App is listening on port: ${port}`);
