/* app.js */

// Change delimiters, since [[]] is used by Flask.
Vue.config.delimiters = ['[[', ']]'];

var app = new Vue({
  el: '#app',

  data: {
    queryType: 'coord',
    prettyData: '',
    stateName: '',
    countyName: '',
    errorMessage: '',
    data: '', isLoading: false,
    hasError: false
  },

  ready: function() {
  },

  methods: {

    setType: function(type) {
      this.queryType = type;
    },

    buildUrl: function() {
      var url = '/?';
      if (this.queryType == 'coord') {
        url += 'lat=' + this.coordLat + '&lon=' + this.coordLon;
      } else {
        url += 'state=' + this.nameState + '&county=' + this.nameCounty;
      }
      return url;
    },

    search: function() {
      this.isLoading = true;
      this.hasError = false;

      $('#buttonCoord').prop('disabled', true);
      $('#buttonNames').prop('disabled', true);

      var url = this.buildUrl();
      
      this.$http({url: url, method: 'GET'}).then(function (response) {
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

      }, function (response) { // Error
        this.isLoading = false;
        this.hasError = true;

        this.errorMessage = 'Error retrieving data. Status : '+response.status;
        
        $('#buttonCoord').removeProp('disabled');
        $('#buttonNames').removeProp('disabled');
      });
    }

  }
});
