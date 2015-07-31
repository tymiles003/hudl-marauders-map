var Devices = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Device.all(function(err, devices) {
      if (err) {
        throw err;
      }
      self.respondWith(devices, {type:'Device'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , device = geddy.model.Device.create(params);

    if (!device.isValid()) {
      geddy.log.error("provided device params are invalid");
      self.respondWith(device);
    }
    else {
      device.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respond(device, {format: 'json'});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        throw err;
      }
      if (!device) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(device);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        throw err;
      }
      if (!device) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(device);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        throw err;
      }
      device.updateProperties(params);

      if (!device.isValid()) {
        self.respondWith(device);
      }
      else {
        device.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(device, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        throw err;
      }
      if (!device) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Device.remove({udid: params.udid}, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(device);
        });
      }
    });
  };

  this.checkout = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        throw err;
      }

      if (!device.checkedOut) {
        device.checkedOut = true;
        device.checkoutTime = new Date();
      }

      if (!device.isValid()) {
        geddy.log.error("error updating device during checkout");
      } else {
        device.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(device);
        });
      }
    });
  }

  this.checkin = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        throw err;
      }

      if (device.checkedOut) {
        device.checkedOut = false;
      }

      if (!device.isValid()) {
        geddy.log.error("error updating device during checkin");
      } else {
        device.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(device);
        });
      }
    });
  }

};

exports.Devices = Devices;
