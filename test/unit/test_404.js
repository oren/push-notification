// settings
var environment = 'test';
var config = require('../../config/' + environment + '.js');
var webSitePort = process.env.WEBSITE_PORT || config.webSitePort;

// core modules
var assert = require('assert');

// non-core packages
var request = require('request');

// GET /not-exist should return 404 - not found
request({
    uri: "http://localhost:" + webSitePort + "/not-exist",
    followRedirect: false 
  }, 
  function (err, res, body) {
    if (err) {
      console.log('Error in ' + __filename + '. ' + err);
    } else {
      assert.equal(res.statusCode, 404)
    };
  });


