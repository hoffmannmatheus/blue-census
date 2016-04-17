/* map.js */

function initMap() {
  var mapContainer = document.getElementById('map');
  var position = {lat: 40.752458759853, lng: -73.986740112305};
  app.updateMapCoordinates(position.lat, position.lng);
  app.search();

  var map = new google.maps.Map(mapContainer, {
    center: position,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl: false,
    streetViewControl: false
  });

  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: 'Click to zoom'
  });

  map.addListener('click', function(evt) {
    if (app.isSearching()) {
      console.log('Still searching, will do nothing.');
      return;
    }
    position = {
      lat: evt.latLng.lat(), 
      lng: evt.latLng.lng()
    };
    marker.setPosition(position);
    app.updateMapCoordinates(position.lat, position.lng);
    app.search();
  });
}

