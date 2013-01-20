var assert = require('assert');
var validate = require('../../validateRegisterData.js');

assert.equal(validate('{"user_id" : "123", "app_id" : "mongoose", "token" : "123", "device_id":"333"}'), true)
assert.equal(validate('{"user_id" : "123", "app_id" : "mongoose", "token" : "123"}'), true)

assert.equal(validate('{"user_id" : "123", "app_id" : "mongoose"}'), false)
assert.equal(validate('{"user_id" : "mongoose", "token" : "hello"}'), false)
assert.equal(validate('{"app_id" : "mongoose", "token" : "123"}'), false)
assert.equal(validate('{"user_id" : "123"}'), false)
assert.equal(validate('{"app_id" : "mongoose"}'), false)
assert.equal(validate('{"token" : "aou"}'), false)
assert.equal(validate('{}'), false)
assert.equal(validate(1), false)
assert.equal(validate([]), false)
assert.equal(validate('abc'), false)
