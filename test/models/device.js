var assert = require('assert')
  , tests
  , Device = geddy.model.Device;

tests = {

  'after': function (next) {
    // cleanup DB
    Device.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var device = Device.create({});
    device.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
