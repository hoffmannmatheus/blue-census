/* app.js */

// Change delimiters, since [[]] is used by Flask.
Vue.config.delimiters = ['[[', ']]'];

app = new Vue({
  el: '#app',

  data: {
    queryType: 'map', // Default type
    prettyData: '',
    stateName: '',
    apiurl: '',
    countyName: '',
    errorMessage: '',
    data: '',
    isLoading: false,
    hasError: false,
    mapLat: 0,
    mapLon: 0
  },

  ready: function() {
  },

  methods: {

    setType: function(type) {
      this.queryType = type;
    },

    updateMapCoordinates: function(lat, lon) {
      this.mapLat = lat;
      this.mapLon = lon;
      this.buildUrl();
    },

    buildUrl: function() {
      var url = 'http://' + window.location.hostname + '/?';
      if (this.queryType == 'names') {
        url += 'state=' + this.nameState + '&county=' + this.nameCounty;
      } else if (this.queryType == 'map') {
        url += 'lat=' + this.mapLat+ '&lon=' + this.mapLon;
      } else {
        url += 'lat=' + this.coordLat + '&lon=' + this.coordLon;
      }
      return url;
    },

    search: function() {
      this.isLoading = true;
      this.hasError = false;

      $('#buttonCoord').prop('disabled', true);
      $('#buttonNames').prop('disabled', true);

      var url = this.buildUrl();

      var success = function (response) {
        this.isLoading = false;

        $('#buttonCoord').removeProp('disabled');
        $('#buttonNames').removeProp('disabled');

        this.hasError = !response.data.success;
        if (this.hasError) {
            this.errorMessage = response.data.error;
            return;
        }
        

        this.data = response.data;
        this.prettyData = JSON.stringify(response.data, null, 2);
        
        if (this.data.results && this.data.results.length > 0) {
          this.stateName = this.data.results[0].STNAME;
          this.countyName = this.data.results[0].CTYNAME;
          charts.plotCharts(this.data);
        }

      };
      var error = function (response) { // Error
        this.isLoading = false;
        this.hasError = true;

        this.errorMessage = 'Error retrieving data. Status : '+response.status;
        
        $('#buttonCoord').removeProp('disabled');
        $('#buttonNames').removeProp('disabled');
      };
      this.$http({url: url, method: 'GET'}).then(success, error);
    },

    isSearching: function() {
      return this.isLoading;
    }
  }
});
