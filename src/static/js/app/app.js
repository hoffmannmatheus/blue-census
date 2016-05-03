/* app.js */

// Change delimiters, since [[]] is used by Flask.
Vue.config.delimiters = ['[[', ']]'];

app = new Vue({
  el: '#app',

  data: {
    queryType: 'map', // Default type
    prettyData: '',
    apiurl: '',
    errorMessage: '',
    data: {},
    dataToCompare: {},
    isLoading: false,
    hasError: false,
    coordLat: 40.752458759853, // nyc
    coordLng: -73.986740112305
  },

  ready: function() {
    this.search();
  },

  methods: {

    /*
     * Sets the type of search or comparison. Can be:
     * - map: Search for only one county information, from the map.
     * - names: Search for a county by state/county names.
     * - coord: Search for a county using coordinates.
     * - map_compare: Comparison of two counties from the map.
     */
    setType: function(type) {
      this.queryType = type;
    },

    /*
     * Gets the current type of search or comparison.
     */
    getType: function() {
      return this.queryType;
    },

    /*
     * Method used by the Map controller, to send updates about  selected
     * coordinates (markers).
     */
    updateMapCoordinates: function(coord) {
      this.coordLat = coord.lat;
      this.coordLng = coord.lng;
      if (this.getType() == 'map_compare') {
        this.compareTo(coord);
      } else {
        this.buildUrl();
        this.search();
      }
    },
    
    /*
     * Used by the 'search' to build URLs, no matter what type of search the
     * user is performing (could be map, county/state names, or coordinates).
     */
    buildUrl: function() {
      var url = 'http://' + window.location.hostname + '/?';
      if (this.getType() == 'names') {
        url += 'state=' + this.nameState + '&county=' + this.nameCounty;
      } else if (this.getType() == 'map') {
        url += 'lat=' + this.coordLat+ '&lon=' + this.coordLng;
      } else {
        url += 'lat=' + this.coordLat + '&lon=' + this.coordLng;
      }
      return url;
    },

    /*
     * Searches for one specific county, plot Chart insights about that county,
     * plus the raw data retrieved from the service.
     */
    search: function() {
      this.isLoading = true;
      this.hasError = false;
      this.updateButtonStates();

      var url = this.buildUrl();

      var success = function (response) {
        this.isLoading = false;
        this.updateButtonStates();

        this.hasError = !response.data.success;
        if (this.hasError) {
            this.errorMessage = response.data.error;
            return;
        }
        this.data = response.data.results;
        if (!this.data || this.data.length == 0) {
            this.hasError = true;
            this.errorMessage = 'Could not locate County.';
            return;
        }
        this.prettyData = JSON.stringify(response.data, null, 2);
        charts.plotCharts(this.data);
      };
      var error = function (response) { // Error
        this.isLoading = false;
        this.hasError = true;
        this.updateButtonStates();
        this.errorMessage = 'Error retrieving data. Status : '+response.status;
      };
      this.$http({url: url, method: 'GET'}).then(success, error);
    },

    /*
     * Will make two requests to get data from two different counties, and then
     * plot the comparison graphs.
     */
    compareTo: function(coord) {
    },

    /*
     * Determines whether requests are being made.
     */
    isSearching: function() {
      return this.isLoading;
    },

    /*
     * Update buttons according to the current state (searching or not).
     */
    updateButtonStates: function() {
      if(this.isSearching()) {
        $('#buttonCoord').prop('disabled', true);
        $('#buttonNames').prop('disabled', true);
      } else {
        $('#buttonCoord').removeProp('disabled');
        $('#buttonNames').removeProp('disabled');
      }
    }
  }
});
