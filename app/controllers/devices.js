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
      this.respondWith(device);
    }
    else {
      device.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(device, {status: err});
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

};

exports.Devices = Devices;
