// settings
var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var webSitePort = process.env.WEBSITE_PORT || config.webSitePort;

// dependencies
var db = config.db;
var push = config.push;

db.connect(config.mongoHost);

// core modules
var http = require('http');

// my modules
var environment = process.env.NODE_ENV || 'development';
var health = require('./health.js');
var checkHealth = require('./checkHealth.js');
var pusher = require('./pusher.js');
var register = require('./register.js');

http.createServer(function(req, res) {
  if (req.url == '/push') { 
    if(req.method.toLowerCase() == 'post') {
      pusher(db, push,  req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/register') { 
    if(req.method.toLowerCase() == 'post') {
      register(db, req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/health') { 
    if(req.method.toLowerCase() == 'get') {
      info = health();
      res.end(JSON.stringify(info));
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else if (req.url == '/health.txt') { 
    if(req.method.toLowerCase() == 'get') {
      checkHealth(req, res);
    } else {
      res.statusCode = 405;
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  };

}).listen(webSitePort);

console.log('Push server is running. port ' + webSitePort + ' and ' + environment + ' environment');
