/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var Main = function () {
  this.index = function (req, resp, params) {

    // get all devices
    var allDevices, allUsers;
    geddy.model.Device.all(function(err, devices) {
      if (err) {
        throw err;
      }
      allDevices = devices;
    });

    geddy.model.User.all(function(err, users) {
      if (err) {
        throw err;
      }
      allUsers = users;
    })

    // get all platforms for devices
    var devicePlatforms = new Set();
    // get all offices for devices
    var deviceOffices = new Set();
    
    if (allDevices) {
      Array.prototype.forEach.call(allDevices, function(device) {
        devicePlatforms.add(device.platform);
        deviceOffices.add(device.office);
      });
    }

    this.respond({params: params,
                  devices: allDevices,
                  devicePlatforms: devicePlatforms,
                  deviceOffices: deviceOffices,
                  users: allUsers,
                  }, {
      format: 'html'
    , template: 'app/views/main/index'
    });
  };
};

exports.Main = Main;
