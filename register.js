// Save user's iPhone details in the DB
//
// first validate the data and save it (insert new one or update existing one)

module.exports = register;

var validRegisterData = require('./validateRegisterData.js');
var formatDate = require('./formatDate.js');

function register(db, req, res) {
  var data = '';

  function save() {
    db.saveDevice(data, function(err, objects) {
      if (err) {
        console.log('error while saving a device', err);
        res.statusCode = 500;
      } else {
        res.statusCode = 201;
      }      

      console.log(formatDate(new Date()) + '\nurl: ' + req.url  + '. status: ' + res.statusCode + '. recieved:' + data);
      res.end(JSON.stringify(data));
    });
  };

  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    if (validRegisterData(data)) {
      save();
    } else {
      res.statusCode = 400;
      console.log(formatDate(new Date()) + '\nurl: ' + req.url  + '. status: ' + res.statusCode + '. recieved:' + data);
      res.end(data);
    }
  });
};
