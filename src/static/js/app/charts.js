/* charts.js */

var options = {
  //legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
pieLegendTemplate: "<ul style=\"list-style-type: none;\" class=\"<%=name.toLowerCase()%>-legend\">  <% for (var i=0; i<segments.length; i++){%>    <li><span style=\"-moz-border-radius:7px 7px 7px 7px; border-radius:7px 7px 7px 7px; margin-right:10px;width:15px;height:15px;display:inline-block;background-color:<%=segments[i].fillColor%>\"> </span>      <%if(segments[i].label){%>        <%=segments[i].label%>          <%}%>    </li>    <%}%></ul>",
barLegendTemplate: "<ul style=\"list-style-type: none;\" class=\"<%=name.toLowerCase()%>-legend\">  <% for (var i=0; i<datasets.length; i++){%>    <li><span style=\"-moz-border-radius:7px 7px 7px 7px; border-radius:7px 7px 7px 7px; margin-right:10px;width:15px;height:15px;display:inline-block;background-color:<%=datasets[i].fillColor%>\"> </span>      <%if(datasets[i].label){%>        <%=datasets[i].label%>          <%}%>    </li>    <%}%></ul>"
};

var plotChart1 = function(data) {
  var canvas = document.getElementById("chartMaleVsFemale").getContext("2d");

  var males = data.results[0].TOT_MALE;
  var females = data.results[0].TOT_FEMALE;

  var data = [
    {
      value: males,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Male Popuplation"
    },
    {
      value: females,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Female Population"
    },
  ];
  var chart = new Chart(canvas).Doughnut(data, {legendTemplate:options.pieLegendTemplate});
  var legend = chart.generateLegend();
  $('#divMaleVsFemaleLegend').html(legend);
};
    
var plotChart2 = function(data) {
  var canvas = document.getElementById("chartRaces").getContext("2d");

  var d = data.results[0];
  var white = d.WA_MALE + d.WA_FEMALE;
  var afamer = d.BA_MALE + d.BA_FEMALE;
  var indian = d.IA_MALE + d.IA_FEMALE;
  var asian = d.AA_MALE + d.AA_FEMALE;
  var hawaii = d.NA_MALE + d.NA_FEMALE;

  var data = {
    labels: [
      "Popuplation"
    ],
    datasets: [
        {
            label: "White Population",
            fillColor: "#F7464A",
            strokeColor: "#F7464A",
            highlightFill: "#FF5A5E",
            highlightStroke: "#FF5A5E",
            data: [white]
        },
        {
            label: "African American Population",
            fillColor: "#46BFBD",
            strokeColor: "#46BFBD",
            highlightFill: "#5AD3D1",
            highlightStroke: "#5AD3D1",
            data: [afamer]
        },
        {
            label: "American Indian Population",
            fillColor: "#FDB45C",
            strokeColor: "#FDB45C",
            highlightFill: "#FFC870",
            highlightStroke: "#FFC870",
            data: [indian]
        },
        {
            label: "Asian Population",
            fillColor: "#949FB1",
            strokeColor: "#949FB1",
            highlightFill: "#A8B3C5",
            highlightStroke: "#A8B3C5",
            data: [asian]
        },
        {
            label: "Asian Population",
            fillColor: "#4D5360",
            strokeColor: "#4D5360",
            highlightFill: "#616774",
            highlightStroke: "#616774",
            data: [hawaii]
        }
    ]
  };

  var chart = new Chart(canvas).Bar(data, {legendTemplate:options.barLegendTemplate});
  var legend = chart.generateLegend();
  $('#divRacesLegend').html(legend);
};

charts = {
  plotCharts : function(data) {
    plotChart1(data);
    plotChart2(data);
  }
};
