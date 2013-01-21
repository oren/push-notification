// Send the push data to each of the user's iPhones
//
// The push function is doing the following:
// validate the push data,
// find all devices of the user_id
// and call the push function (the one passed as an argument)on each device

module.exports = push;

var validPushData = require('./validatePushData.js');
var formatDate = require('./formatDate.js');

// dependency injection - db and push will be replaces with mock objects during tests - mockDb.js and mockPush.js
function push(db, push, req, res) {
  var data = '';

  function pushAPNS(data) {
    // get all tokens of a user_id
    db.getTokens(data, function(err, tokens) {
      if (tokens.length === 0) {
        console.log('user id ' + data.user_id + ' has no devices');  
      } else {
        tokens.forEach(function(token) {
          // push to Apple notification server. Apple will take care of sending to the iPhone
          push(token, data.message);
        });
      };
    });
  };

  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    if (dataObj = validPushData(data)) {
      pushAPNS(dataObj);
      res.statusCode = 202;
    } else {
      res.statusCode = 400;
    }
    console.log(formatDate(new Date()) + '\nurl: ' + req.url  + '. status: ' + res.statusCode + '. recieved:' + dataObj);
    res.end(data);
  });
};
