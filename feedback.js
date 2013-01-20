var apns = require('apn');

function onFeedback(time, buffer) {
  console.log('time', time);
  console.log('buffer', buffer);
};

var options = {
  cert: 'mongoose-prod.pem',          /* Certificate file path */
  key:  'mongoose-prod.pem',          /* Key file path */
  passphrase: 'welcome',              /* A passphrase for the Key file */
  address: 'feedback.push.apple.com', /* gateway address */
  port: 2196,                         /* gateway port */
  feedback: onFeedback,               /* enable feedback service, set to callback */
  batchFeedback: onFeedback,               /* if feedback should be called once per connection. */
  interval: 0                         /* interval in seconds to connect to feedback service */
};

var feedback = new apns.Feedback(options);
feedback.start();
