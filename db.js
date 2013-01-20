module.exports.connect = connect;
module.exports.getTokens = getTokens;
module.exports.saveDevice = saveDevice;

// settings
var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');

var MongoClient = require('mongodb').MongoClient;
var dbCon = null;

// my modules
var cleanToken = require('./cleanToken.js');
var formatDate = require('./formatDate.js');

function connect(host) {

  MongoClient.connect(host, function(err, db) {
    if(err) {
      console.log('error in opening the db', err);
      process.exit();
    } else {
      console.log('establish connection to MongoDB');
      dbCon = db;
    };
  });

};

function getTokens(data, cb) {
  var tokens = [];

  dbCon.collection('devices').find({'user_id': data.user_id},{'token':1}).toArray(function(err, devices) {
    if (err) { 
      console.log('error', err.message); 
      callback(err);
    }
    else {
      devices.forEach(function(x) { tokens.push(x.token) });
      cb(null, tokens);
    }
  });
};

function saveDevice(data, cb) {
  var tokens = [];
  var today = new Date();

  data = JSON.parse(data);
  data.token = cleanToken(data.token);
  data.updated_at = today.getTime();
  data.updated_at_str = formatDate(today);

  dbCon.collection('devices').update(
      {'token' : data.token},
      {$set : {'user_id':data.user_id, 'app_id':data.app_id, 'token':data.token, 'device_id':data.device_id, 'updated_at':data.updated_at, 'updated_at_str':data.updated_at_str}},
      {'upsert':true, 'safe':true}, 
      function(err, device) {
        if (err) { 
          console.log('error', err.message); 
          callback(err);
        }
        else {
          cb(null, data);
        }
      });
};
