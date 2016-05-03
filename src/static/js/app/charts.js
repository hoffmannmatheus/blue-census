/* charts.js */

var options = {
  //legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
pieLegendTemplate: "<ul style=\"list-style-type: none;\" class=\"<%=name.toLowerCase()%>-legend\">  <% for (var i=0; i<segments.length; i++){%>    <li><span style=\"-moz-border-radius:7px 7px 7px 7px; border-radius:7px 7px 7px 7px; margin-right:10px;width:15px;height:15px;display:inline-block;background-color:<%=segments[i].fillColor%>\"> </span>      <%if(segments[i].label){%>        <%=segments[i].label%>          <%}%>    </li>    <%}%></ul>",
barLegendTemplate: "<ul style=\"list-style-type: none;\" class=\"<%=name.toLowerCase()%>-legend\">  <% for (var i=0; i<datasets.length; i++){%>    <li><span style=\"-moz-border-radius:7px 7px 7px 7px; border-radius:7px 7px 7px 7px; margin-right:10px;width:15px;height:15px;display:inline-block;background-color:<%=datasets[i].fillColor%>\"> </span>      <%if(datasets[i].label){%>        <%=datasets[i].label%>          <%}%>    </li>    <%}%></ul>"
};

var plotMaleVsFemale = function(data) {
  var canvas = document.getElementById("chartMaleVsFemale").getContext("2d");

  var males = data.TOT_MALE;
  var females = data.TOT_FEMALE;

  var data = [
    {
      value: males,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: "Male Population"
    },
    {
      value: females,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: "Female Population"
    },
  ];
  var chart = new Chart(canvas).Doughnut(data, {
    legendTemplate:options.pieLegendTemplate,
    animationEasing: "linear",
    animationSteps: 25,
    responsive: true
  });
  var legend = chart.generateLegend();
  $('#divMaleVsFemaleLegend').html(legend);
};
    
var plotRaces = function(data) {
  var canvas = document.getElementById("chartRaces").getContext("2d");

  var d = data;
  var white = d.WA_MALE + d.WA_FEMALE;
  var afamer = d.BA_MALE + d.BA_FEMALE;
  var indian = d.IA_MALE + d.IA_FEMALE;
  var asian = d.AA_MALE + d.AA_FEMALE;
  var hawaii = d.NA_MALE + d.NA_FEMALE;

  var data = {
    labels: [
      "Population"
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

  var chart = new Chart(canvas).Bar(data, {
    legendTemplate:options.barLegendTemplate,
    animationEasing: "linear",
    animationSteps: 25,
    responsive: true
  });
  var legend = chart.generateLegend();
  $('#divRacesLegend').html(legend);
};

var plotCompareTotalPop = function(data1, data2) {
  var canvas = document.getElementById("chartCompareTotalPop").getContext("2d");

  var pop1 = data1.TOT_POP;
  var pop2 = data2.TOT_POP;

  var data = [
    {
      value: pop1,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: data1.CTYNAME + " (" + pop1 + ")"
    },
    {
      value: pop2,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: data2.CTYNAME + " (" + pop2 + ")"
    },
  ];
  var chart = new Chart(canvas).Pie(data, {
    legendTemplate:options.pieLegendTemplate,
    animationEasing: "linear",
    animationSteps: 25,
    responsive: true
  });
  var legend = chart.generateLegend();
  $('#divCompareTotalLegend').html(legend);
};

var plotCompareWhitePop = function(data1, data2) {
  var canvas = document.getElementById("chartCompareWhitePop").getContext("2d");

  var pop1 = data1.TOT_POP;
  var white1 = data1.WAC_MALE + data1.WAC_FEMALE;
  var perc1 = ((white1*100)/pop1).toFixed(2);

  var pop2 = data2.TOT_POP;
  var white2 = data2.WAC_MALE + data2.WAC_FEMALE;
  var perc2 = ((white2*100)/pop2).toFixed(2);

  var data = [
    {
      value: perc1,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: data1.CTYNAME + " (" + perc1+ "%)"
    },
    {
      value: perc2,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: data2.CTYNAME + " (" + perc2+ "%)"
    },
  ];
  var chart = new Chart(canvas).Doughnut(data, {
    legendTemplate:options.pieLegendTemplate,
    animationEasing: "linear",
    animationSteps: 25,
    responsive: true
  });
  var legend = chart.generateLegend();
  $('#divCompareWhitePop').html(legend);
};

var plotCompareAsianPop = function(data1, data2) {
  var canvas = document.getElementById("chartCompareAsianPop").getContext("2d");

  var pop1 = data1.TOT_POP;
  var asian1 = data1.AAC_MALE + data1.AAC_FEMALE;
  var perc1 = ((asian1*100)/pop1).toFixed(2);

  var pop2 = data2.TOT_POP;
  var asian2 = data2.AAC_MALE + data2.AAC_FEMALE;
  var perc2 = ((asian2*100)/pop2).toFixed(2);

  var data = [
    {
      value: perc1,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: data1.CTYNAME + " (" + perc1+ "%)"
    },
    {
      value: perc2,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: data2.CTYNAME + " (" + perc2+ "%)"
    },
  ];
  var chart = new Chart(canvas).Doughnut(data, {
    legendTemplate:options.pieLegendTemplate,
    animationEasing: "linear",
    animationSteps: 25,
    responsive: true
  });
  var legend = chart.generateLegend();
  $('#divCompareAsianPop').html(legend);
};

var plotCompareBlackPop = function(data1, data2) {
  var canvas = document.getElementById("chartCompareBlackPop").getContext("2d");

  var pop1 = data1.TOT_POP;
  var black1 = data1.BAC_MALE + data1.BAC_FEMALE;
  var perc1 = ((black1*100)/pop1).toFixed(2);

  var pop2 = data2.TOT_POP;
  var black2 = data2.BAC_MALE + data2.BAC_FEMALE;
  var perc2 = ((black2*100)/pop2).toFixed(2);

  var data = [
    {
      value: perc1,
      color:"#F7464A",
      highlight: "#FF5A5E",
      label: data1.CTYNAME + " (" + perc1+ "%)"
    },
    {
      value: perc2,
      color: "#46BFBD",
      highlight: "#5AD3D1",
      label: data2.CTYNAME + " (" + perc2+ "%)"
    },
  ];
  var chart = new Chart(canvas).Doughnut(data, {
    legendTemplate:options.pieLegendTemplate,
    animationEasing: "linear",
    animationSteps: 25,
    responsive: true
  });
  var legend = chart.generateLegend();
  $('#divCompareBlackPop').html(legend);
};

charts = {
  plotCountyCharts : function(data) {
    plotMaleVsFemale(data);
    plotRaces(data);
  },
  plotComparisonCharts: function(data1, data2) {
    plotCompareTotalPop(data1, data2);
    plotCompareWhitePop(data1, data2);
    plotCompareAsianPop(data1, data2);
    plotCompareBlackPop(data1, data2);
  }
};
