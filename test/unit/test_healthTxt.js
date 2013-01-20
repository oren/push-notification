// settings
var environment = 'test';
var config = require('../../config/' + environment + '.js');
var webSitePort = process.env.WEBSITE_PORT || config.webSitePort;

// core modules
var assert = require('assert');
var fs = require('fs');

// non-core packages
var request = require('request');

fs.writeFileSync('health.txt');

// GET /health.txt should return 200 if the health.txt exists
request({
    'uri' : "http://localhost:" + webSitePort + "/health.txt",
    followRedirect: false 
  }, 
  function (err, res, body) {
    if (err) {
      console.log('Error in ' + __filename + '. ' + err);
    } else {
      assert.equal(res.statusCode, 200)
    };
    fs.unlinkSync('health.txt')
  });



