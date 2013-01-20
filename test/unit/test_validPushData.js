var assert = require('assert');
var validate = require('../../validatePushData.js');

assert.deepEqual(validate('{"user_id" : "123", "app_id" : "mongoose", "message" : "hello"}'),{"user_id" : "123", "app_id" : "mongoose", "message" : "hello"})

assert.equal(validate('{}'), false)
assert.equal(validate('{"user_id" : "123"}'), false)
assert.equal(validate('{"app_id" : "mongoose"}'), false)
assert.equal(validate('{"message" : "hello"}'), false)
assert.equal(validate('{"user_id" : "123", "app_id" : "mongoose"}'), false)
assert.equal(validate('{"app_id" : "mongoose", "message" : "hello"}'), false)
assert.equal(validate('{"user_id" : "mongoose", "message" : "hello"}'), false)
assert.equal(validate(1), false)
assert.equal(validate([]), false)
assert.equal(validate('abc'), false)



