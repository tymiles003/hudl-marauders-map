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

function updateModal(device) {
  var modalTitle = document.getElementById("modal-title");
  modalTitle.innerHTML = device.name;

  var checkString = (device.checkedOut ? "checkin" : "checkout");

  var modalForm = document.getElementById("check-device-form");
  modalForm.dataset.device_udid = device.udid;
  modalForm.dataset.device_checkedout = device.checkedOut;

  var modalInput = document.getElementById("check-device-input");
  modalInput.value = checkString + " device";

  // clear the select
  var selectize = $('#user-select')[0].selectize;
  selectize.clear();

  modalInput.className = modalInput.className.replace("disabled", "")
  modalInput.type = "";
  if (!device.checkedOut) {
    modalInput.className = modalInput.className + " disabled";
  }
  else {
    selectize.addItem(device.user.id);
    modalInput.type = "submit";
  }
}

function updateModalUser(userId) {
  var modalForm = document.getElementById("check-device-form");
  device_udid = modalForm.dataset.device_udid;
  device_checkedout = modalForm.dataset.device_checkedout;

  modalForm.action = "/devices/"+device_udid+"/"+device_checkedout+"?_method=PUT";
}

function updateSearch(event) {
  var word = document.getElementById('focusedInput').value;
  if (word.includes('<') || word.includes('>')){
    document.getElementById('focusedInput').value = word.replace(/[\>\<]/gi,"");
  }
  buildDeviceListDOM();
}

function fuzzySearch(text, query) {
  if (query == "") {
    return true;
  }
  query = query.toLowerCase().trim();
  text = text.toLowerCase();
  var res = query.split(' ').filter( function(q) {
    if (text.indexOf(q) == -1) {
      return false;
    }
    return true;
  });
  return (res.length > 0);
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
  var searchDOM = document.getElementById('focusedInput');
  var searchString = searchDOM.value;

  if(devices) {
    devices = devices.filter( function(device) {
      return (device.platform == (platformString == "All" ? device.platform : platformString)) &&
                (device.office == (officeString == "All" ? device.office : officeString)) &&
                (device.checkedOut == (availabilityString == "All" ? device.checkedOut : (availabilityString=="Checked Out"))) &&
                (fuzzySearch(device.name+device.platform+device.osVersion+device.office+device.zone, searchString))
    });
    devices.forEach( function(device) {
      if (device.zone != undefined) {
        var zoneElement;
        if (document.getElementById("device-zone-"+device.zone) == undefined) {
          // create our zone container div
          zoneElement = document.createElement('div');
          zoneElement.className = "zone-container nav nav-pills nav-stacked";
          zoneElement.id = "device-zone-"+device.zone;
          zoneElement.onmouseover = function() {zoneOver(device.zone)};
          zoneElement.onmouseout = function() {zoneOver('')};
          var zoneHeader = document.createElement('li');
          zoneHeader.className = "active";
          zoneHeader.innerHTML = '<a href="#">'+device.zone+'</a>';
          zoneElement.appendChild(zoneHeader);
          deviceList.appendChild(zoneElement);
        }
        else {
          // otherwise, just grab one that already exists
          zoneElement = document.getElementById("device-zone-"+device.zone);
        }

        var deviceDiv = document.createElement('li');
        deviceDiv.innerHTML = '<a href="#" data-toggle="modal" class="'+(device.checkedOut ? "checked-out" : "checked-in")+'" data-target="#checkoutModal">'+device.name+'</a>';
        var deviceElement = deviceDiv.getElementsByTagName("a")[0];

        deviceElement.onclick = function() {updateModal(device)};

        zoneElement.appendChild(deviceDiv);
      }
    });
  }
}
