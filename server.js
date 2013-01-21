// settings
var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var webSitePort = process.env.WEBSITE_PORT || config.webSitePort;

// core modules
var http = require('http');

// my modules
var router = require('./router.js');

http.createServer(function(req, res) {
  router(req, res);
}).listen(webSitePort);

console.log('Push server is running. port ' + webSitePort + ' and ' + environment + ' environment');
