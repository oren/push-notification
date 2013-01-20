var assert = require('assert');
var validate = require('../../validateRegisterDataLegacy.js');

assert.equal(validate('{"appId" : "ypmobile", "dvn" : "kuba iphone", "m" : "register-apns-device", "tkn" : "123456", "udid" : "4434", "uid" : "1"}'), true)
assert.equal(validate('{"appId" : "ypmobile", "m" : "register-apns-device", "tkn" : "123456", "udid" : "4434", "uid" : "1"}'), true)

assert.equal(validate('{"m" : "register-apns-device", "tkn" : "123456", "udid" : "4434", "uid" : "1"}'), false)
assert.equal(validate('{"appId" : "ypmobile", "tkn" : "123456", "udid" : "4434", "uid" : "1"}'), false)
assert.equal(validate('{"appId" : "ypmobile", "m" : "register-apns-device", "udid" : "4434", "uid" : "1"}'), false)
assert.equal(validate('{"appId" : "ypmobile", "m" : "register-apns-device", "tkn" : "123456", "uid" : "1"}'), false)
assert.equal(validate('{"appId" : "ypmobile", "m" : "register-apns-device", "tkn" : "123456", "udid" : "4434"}'), false)

assert.equal(validate('{}'), false)
assert.equal(validate(1), false)
assert.equal(validate([]), false)
assert.equal(validate('abc'), false)
