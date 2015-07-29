var CreateDevices = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('name', 'string');
          t.column('udid', 'string');
          t.column('platform', 'string');
          t.column('osVersion', 'string');
          t.column('description', 'string');
          t.column('office', 'string');
          t.column('location', 'object');
          t.column('user', 'object');
          t.column('checkedOut', 'boolean');
          t.column('checkoutTime', 'datetime');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('device', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('device', callback);
  };
};

exports.CreateDevices = CreateDevices;
