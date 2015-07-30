// javascript to control the main page
function zoneOver(zone) {
  var allZones = document.getElementsByClassName("zone-map");
  if (allZones) {
    Array.prototype.forEach.call(allZones, function(map) {
      map.className = map.className.replace(" active", " inactive");
    });
  }

  var mapZones = document.getElementsByClassName("zone-"+zone.toLowerCase());
  if (mapZones) {
    Array.prototype.forEach.call(mapZones, function(map) {
      map.className = map.className.replace(" inactive", " active");
    });
  }
}

function clickPill(element) {
  var activeList = element.parentElement.getElementsByClassName("active");
  Array.prototype.forEach.call(activeList, function(e) {
    e.className = e.className.replace("active", "");
  });
  element.className = element.className + " active";
  buildDeviceListDOM();
}

function buildDeviceListDOM() {

  // get all devices
  var devices = JSON.parse(localStorage.devices || "{}");

  var deviceList = document.getElementById("devices-list");
  deviceList.innerHTML = "";

  // check the platform
  var platformDOM = document.getElementById("platform-filter");
  var platformString = platformDOM.getElementsByClassName("active")[0].textContent;

  // check the office
  var officeDOM = document.getElementById("office-filter");
  var officeString = officeDOM.getElementsByClassName("active")[0].textContent;

  // check the availability
  var availabilityDOM = document.getElementById("availability-filter");
  var availabilityString = availabilityDOM.getElementsByClassName("active")[0].textContent;

  // check the search


  if(devices) {
    devices = devices.filter( function(device) {
      return (device.platform == (platformString == "All" ? device.platform : platformString)) &&
                (device.office == (officeString == "All" ? device.office : officeString)) &&
                (device.checkedOut == (availabilityString == "All" ? device.checkedOut : (availabilityString=="Checked Out")))
    });
    devices.forEach( function(device) {
      if (device.zone != undefined) {
        var zoneElement;
        if (document.getElementById("device-zone-"+device.zone) == undefined) {
          // create our zone container div
          zoneElement = document.createElement('div');
          zoneElement.className = "zone-container";
          zoneElement.id = "device-zone-"+device.zone;
          zoneElement.onmouseover = function() {zoneOver(device.zone)};
          zoneElement.onmouseout =  function() {zoneOver('')};
          var zoneHeader = document.createElement('h3');
          zoneHeader.innerHTML = device.zone;
          zoneElement.appendChild(zoneHeader);
          deviceList.appendChild(zoneElement);
        }
        else {
          // otherwise, just grab one that already exists
          zoneElement = document.getElementById("device-zone-"+device.zone);
        }
        var deviceElement = document.createElement('h4');
        deviceElement.innerHTML = device.name;
        zoneElement.appendChild(deviceElement);
      }
    });
  }
}
