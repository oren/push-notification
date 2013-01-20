// settings
var environment = 'test';
var config = require('../../config/' + environment + '.js');
var webSitePort = process.env.WEBSITE_PORT || config.webSitePort;

// core modules
var assert = require('assert');

// non-core packages
var request = require('request');

// POST /register with no token should return 400
var options = {
  'method' : 'POST',
  'uri' : "http://localhost:" + webSitePort + "/register",
  'body' : '{"user_id" : "1", "app_id" : "mongoose", "device_id" : "123"}',
  'headers' : {
    'content-type' : 'application/x-www-form-urlencoded'
  }
};

request(options, function (err, res, body) {
  if (err) {
    console.log('Error in ' + __filename + '. ' + err);
  } else {
    assert.equal(res.statusCode, 400)
    process.exit();
  }
})

