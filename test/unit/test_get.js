// settings
var environment = 'test';
var config = require('../../config/' + environment + '.js');
var webSitePort = process.env.WEBSITE_PORT || config.webSitePort;

// core modules
var assert = require('assert');

// non-core packages
var request = require('request');

// GET /push should return 405 - method not allowed
request({
    uri: "http://localhost:" + webSitePort + "/push",
    followRedirect: false 
  }, 
  function (err, res, body) {
    if (err) {
      console.log('Error in ' + __filename + '. ' + err);
    } else {
      assert.equal(res.statusCode, 405)
    };
  });


