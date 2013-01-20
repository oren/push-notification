module.exports = checkHealth;

var fs = require('fs');

function checkHealth(req, res) {
  fs.exists('health.txt', function (exists) {

  if (exists) {
    res.statusCode = 200;
    res.end('health=ok');
  } else {
    res.statusCode = 400;
    res.end();
  }
  });

};

