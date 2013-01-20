module.exports = push;

function push(token, message) {
  try {
    var myDevice = new apns.Device(token);
  } catch(e) {
    /* handle error */
    console.log('exception was thrown from push.js: ' + e);
    return 1;
  }

  // notification info
  var note = new apns.Notification();
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
  note.sound = "ping.aiff";
  note.alert = message; //"Hello Kitty!  ^___^";
  note.payload = {'messageFrom': 'YP'};
  note.device = myDevice;

  // send it already!
  apnsConnection.sendNotification(note);
  console.log('push of token ' + token + ' with the message ' + message);
};

var apns = require('apn');
var fs = require('fs');

// var caCert = fs.readFileSync('entrust.pem');

// connection options
var options = {
  cert: 'mongoose-prod.pem',                      /* Certificate file path */
  key:  'mongoose-prod.pem',                      /* Key file path */
  passphrase: 'welcome',
  // gateway: 'gateway.sandbox.push.apple.com', /* gateway address - testing */
  gateway: 'gateway.push.apple.com',       /* gateway address - production */
  // ca: caCert,
  port: 2195,                                /* gateway port */
  rejectUnauthorized: false,                  /* Value of rejectUnauthorized property to be passed through to tls.connect() */
  enhanced: true,                            /* enable enhanced format */
  errorCallback: undefined,                  /* Callback when error occurs function(err,notification) */
  cacheLength: 100,                          /* Number of notifications to cache for error purposes */
  autoAdjustCache: true,                     /* Whether the cache should grow in response to messages being lost after errors. */
  connectionTimeout: 0                       /* The duration the socket should stay alive with no activity in milliseconds. 0 = Disabled. */
};

var apnsConnection = new apns.Connection(options);

// listening to different connection events
apnsConnection.on('error', function(error){
  console.log('error', error);
});

apnsConnection.on('transmitted', function(notification){
  console.log('transmitted. notification: ', notification);
});

apnsConnection.on('timeout', function(){
  console.log('timeout');
});

apnsConnection.on('connected', function(){
  console.log('connected');
});

apnsConnection.on('disconnected', function(){
  console.log('disconnected');
});

apnsConnection.on('socketError', function(error){
  console.log('socket error', error);
});

apnsConnection.on('transmissionError', function(errorCode, notification){
  console.log('transmission error');
  console.log('error code', errorCode);
  console.log('notification: ', notification);
});

apnsConnection.on('cacheTooSmall', function(difference){
  console.log('cache too small');
  console.log('difference', difference);
});
