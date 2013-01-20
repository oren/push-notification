module.exports.connect = connect;
module.exports.getTokens = getTokens;
module.exports.saveDevice = saveDevice;
module.exports.saveYpMobile = saveYpMobile;

// my modules
var cleanToken = require('./cleanToken.js');

function connect(host) {
  console.log('mocking connection to DB');
};

function getTokens(data, cb) {
  var tokens = ['mocked-token-1', 'mocked-token-2'];
  cb(null, tokens);
};

function saveDevice(data, cb) {
  data = JSON.parse(data);
  data.token = cleanToken(data.token);

  var device = {'key': 'value'};
  cb(null, device);
};

function saveYpMobile(data, cb) {
  data = JSON.parse(data);
  data.token = cleanToken(data.tkn);

  var device = {'key': 'value'};
  cb(null, device);
};
