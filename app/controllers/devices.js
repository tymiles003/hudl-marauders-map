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
        geddy.log.error("encountered error while searching for existing device during create. udid: " + params.udid);
        throw err;
      }
      if (existingDevice) {
        device = existingDevice;
      }
    });

    if (device) {
      geddy.log.info("existing device with udid " + device.udid + " found: updating from params:");
      console.log(device);
      geddy.log.info("updating that device " + device.udid + " with params:");
      console.log(params);
      device.updateProperties(params);
    } else {
      geddy.log.info("no device found with udid " + params.udid + "; creating a new device from params:");
      console.log(params);
      device = geddy.model.Device.create(params);
      geddy.log.info("device created:");
      console.log(device);
    }

    if (!device.isValid()) {
      geddy.log.error("device invalid...bad params? params:");
      console.log(params);
      self.respondWith(device);
    }
    else {
      device.save(function(err, data) {
        if (err) {
          geddy.log.error("error saving new device " + device.udid + ":");
          console.log(device);
          throw err;
        }
        geddy.log.info("save of device " + device.udid + " successful");
        self.respond(device, {format: 'json'});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        geddy.log.error("encountered error attempting to find device to show. udid: " + params.udid);
        throw err;
      }
      if (!device) {
        geddy.log.error("no device found to show. params:");
        console.log(params);
        throw new geddy.errors.NotFoundError();
      }
      else {
        geddy.log.info("requesting device to show:");
        console.log(device);
        self.respondWith(device);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        geddy.log.error("encountered error attempting to find device to edit. udid: " + params.udid);
        throw err;
      }
      if (!device) {
        geddy.log.error("no device found to edit. params:");
        console.log(params);
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
        geddy.log.error("encountered error attempting to find device to update. udid: " + params.udid);
        throw err;
      }
      geddy.log.info("attempting to update (potentially null) user: " + params.userId);
      geddy.model.User.first(params.userId, function(err, user) {
        if (err) {
          geddy.log.error("an error occurred while querying user during device update. userId: " + params.userId);
          throw err;
        }
        if (user !== undefined && params.checkedOut !== undefined) {
          device.user = user;
          geddy.log.info("updated device " + device.udid + " user to:");
          console.log(device.user);
        }
        if (params.name !== undefined) {
          device.name = params.name;
          geddy.log.info("updated device " + device.udid + " name to: " + device.name);
        }
        if (params.office !== undefined) {
          device.office = params.office;
          geddy.log.info("updated device " + device.udid + " office to: " + device.office);
        }
        if (params.zone !== undefined) {
          device.zone = params.zone;
          geddy.log.info("updated device " + device.udid + " zone to: " + device.zone);
        }
        if (params.checkedOut !== undefined) {
          device.checkedOut = params.checkedOut;
          if (device.checkedOut == 'true') {
            geddy.log.info("updated device " + device.udid + "; now checked out");
            device.checkoutTime = new Date();
          } else {
            device.checkoutTime = null;
            device.user = null;
            geddy.log.info("updated device " + device.udid + "; now checked in");
          }
        }
        geddy.log.info("device " + device.udid + " after updates (not yet saved):");
        console.log(device);
      });

      if (!device.isValid()) {
        geddy.log.error("device invalid...bad params? params:");
        console.log(params);
        self.respondWith(device);
      }
      else {
        device.save(function(err, data) {
          if (err) {
            geddy.log.error("error saving new device " + device.udid + ":");
            console.log(device);;
            throw err;
          }
          geddy.log.info("save of device " + device.udid + " successful");
          self.respondTo({
            html: function() {
              self.redirect('/');
            },
            json: function() {
              self.respond(device, {statusCode: 200, format: 'json'});
            }
          });
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Device.first({udid: params.udid}, function(err, device) {
      if (err) {
        geddy.log.error("encountered error attempting to find device to remove. udid: " + params.udid);
        throw err;
      }
      if (!device) {
        geddy.log.error("no device found to remove. params:");
        console.log(params);
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.log.info("attempting to remove device:");
        console.log(device);
        geddy.model.Device.remove({udid: params.udid}, function(err) {
          if (err) {
            geddy.log.error("encountered error removing device. udid: " + params.udid);
            throw err;
          }
          geddy.log.info("successfully removed device");
          self.respondWith(device);
        });
      }
    });
  };

};

exports.Devices = Devices;
