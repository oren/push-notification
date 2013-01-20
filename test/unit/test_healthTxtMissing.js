// settings
var environment = 'test';
var config = require('../../config/' + environment + '.js');
var webSitePort = process.env.WEBSITE_PORT || config.webSitePort;

// core modules
var assert = require('assert');

// non-core packages
var request = require('request');

// GET /health.txt should return 400 if the health.txt is missing
request({
    'uri' : "http://localhost:" + webSitePort + "/health.txt",
    followRedirect: false 
  }, 
  function (err, res, body) {
    if (err) {
      console.log('Error in ' + __filename + '. ' + err);
    } else {
      assert.equal(res.statusCode, 400)
    };
  });



