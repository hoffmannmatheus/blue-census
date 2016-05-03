/* map.js */

var plotBlueMarkerNext = true;  // iterates red and blue marker
var marker1;
var marker2;

/*
 * Called when Google Maps API finished loading (jsonp).
 */
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
  marker1 = new google.maps.Marker({
    position: markerPosition1,
    map: map
  });
  marker2 = new google.maps.Marker({
    map: map
  });

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

function alternateMapMarker() {
  plotBlueMarkerNext = app.getType() == 'map_compare'
      ? !plotBlueMarkerNext // Invert marker if in comparison mode.
      : plotBlueMarkerNext; // Do nothing otherwise.
}

function resetMapMarkers(coord) {
    marker1.setPosition(coord);
    marker2.setPosition({lat:-27.6054954,lng:-48.4588024}); // No one will find me.
    plotBlueMarkerNext = true;
}
