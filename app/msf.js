/* jshint node: true */

// Small server to host site
var connect = require("connect");
var http = require("http");
var compression = require("compression");
var serveStatic = require("serve-static");
//var favicon = require("serve-favicon");

var app = connect();

// Compress outgoing responses with gzip/deflate
app.use(compression());

// Favicon
//app.use(favicon(__dirname + "/../public/favicon.ico"));

// Serve static directory
app.use(serveStatic(__dirname + "/../public"));
app.use("/lib", serveStatic(__dirname + "/../lib"));
app.use("/bower_components", serveStatic(__dirname + "/../bower_components"));

// Create node.js http server and listen on port
http.createServer(app).listen(process.env.PORT || 3000);
