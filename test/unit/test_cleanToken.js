var assert = require('assert');
var clean = require('../../cleanToken.js');

assert.equal(clean("<1234>"), "1234")
assert.equal(clean("<1c891aa7 23b2056b 8df4d9c1 a2ce5103 f307a3a2 a7e0699e 9b35c277 36584d68>"), "1c891aa7 23b2056b 8df4d9c1 a2ce5103 f307a3a2 a7e0699e 9b35c277 36584d68");
assert.equal(clean("1234"), "1234")
assert.equal(clean("1c891aa7 23b2056b 8df4d9c1 a2ce5103 f307a3a2 a7e0699e 9b35c277 36584d68"), "1c891aa7 23b2056b 8df4d9c1 a2ce5103 f307a3a2 a7e0699e 9b35c277 36584d68");
