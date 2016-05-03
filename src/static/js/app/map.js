/* map.js */

function initMap() {
  var mapContainer = document.getElementById('map');

  var markerPosition1 = {lat: app.coordLat, lng: app.coordLng};
  var markerPosition2 = {lat: 0, lng: 0};
  var config = {
    center: markerPosition1,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.TERRAIN,
    mapTypeControl: false,
    streetViewControl: false
  };

  var map = new google.maps.Map(mapContainer, config);
  var marker1 = new google.maps.Marker({
    position: markerPosition1,
    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    map: map
  });
  var marker2 = new google.maps.Marker({
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    map: map
  });

  var plotBlueMarkerNext = true;  // iterates red and blue
  map.addListener('click', function(evt) {
    if (app.isSearching()) {
      console.log('Still searching, will do nothing.');
      return;
    }

    if (app.getType() == 'map_compare' && plotBlueMarkerNext) {
      markerPosition2 = {
        lat: evt.latLng.lat(), 
        lng: evt.latLng.lng()
      };
      marker2.setPosition(markerPosition2);
      app.updateMapCoordinates(markerPosition2);
    } else {
      markerPosition1 = {
        lat: evt.latLng.lat(), 
        lng: evt.latLng.lng()
      };
      marker1.setPosition(markerPosition1);
      app.updateMapCoordinates(markerPosition1);
    }
  });
};
