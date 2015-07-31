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
    var self = this;

    var device;
    geddy.model.Device.first({udid: params.udid}, function(err, existingDevice) {
      if (err) {
        geddy.log.error("encountered error while searching for existing device during create");
        throw err;
      }
      if (existingDevice) {
        device = existingDevice;
      }
    });

    if (device) {
      geddy.log.info("existing device with provided udid found; updating from params");
      device.updateProperties(params);
    } else {
      geddy.log.info("no device found with that udid; creating a new device");
      device = geddy.model.Device.create(params);
    }

    if (!device.isValid()) {
      geddy.log.error("provided device params are invalid");
      self.respondWith(device);
    }
    else {
      device.save(function(err, data) {
        if (err) {
          geddy.log.error("problem saving new device");
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
        geddy.log.error("no device found to show");
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
        geddy.log.error("no device found to edit");
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
        geddy.log.error("an error occurred while querying device during device update");
        throw err;
      }
      geddy.log.info("attempting to update (potentially null) user: " + params.userId);
      geddy.model.User.first(params.userId, function(err, user) {
        if (err) {
          geddy.log.error("an error occurred while querying user during device update");
          throw err;
        }
        if (user !== undefined) {
          geddy.log.info("updating device user");
          device.user = user;
        }
        if (params.zone !== undefined) {
          geddy.log.info("updating device zone");
          device.zone = params.zone;
        }
        if (params.checkedOut !== undefined) {
          geddy.log.info("updating device checkout status");
          device.checkedOut = params.checkedOut;
          if (device.checkedOut == 'true') {
            device.checkoutTime = new Date();
          } else {
            device.checkoutTime = null;
            device.user = null;
          }
        }
      });

      if (!device.isValid()) {
        geddy.log.error("invalid device to update");
        self.respondWith(device);
      }
      else {
        device.save(function(err, data) {
          if (err) {
            geddy.log.error("problem saving updates to device");
            throw err;
          }
          self.respondWith(device, {statusCode:200, format: 'json'});
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
        geddy.log.error("no device found to remove");
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

};

exports.Devices = Devices;
