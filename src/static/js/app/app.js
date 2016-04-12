

Vue.config.delimiters = ['[[', ']]'];

var app = new Vue({
  el: '#app',

  data: {
    queryType: 'coord',
    url: '/?state=New Jersey'
  },

  ready: function() {
    console.log("LOADED");
  },

  methods: {
    setType: function(type) {
      this.queryType = type;
    }
  }
});
