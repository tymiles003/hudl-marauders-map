// javascript to control the main page

function zoneHover(zone) {
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
