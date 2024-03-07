export const graph = {
  bar: {
    graphColor: [
      "#3282FA",
      "#6EB8F9",
      "#8CC8FA",
      "#00429A",
      "#005FB0",
      "#00C8F6",
      "#7CD8FB",
      "#0074B0",
      "#008BD0",
      "#4577C1",
    ],
    defaultBackground: "#F3FAFF",
    showGrid: false,
    showLegend: false,
    iconType: "square", //'line' | 'plainline' | 'square' | 'rect'| 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | 'none'
    showValuesOnTop: false,
    barSize: 13,
    radius: 20,
    fontSize: 12,
    textXAngle: -45,
    textColor: "#6E7191",
    timestamp: "collector_tstamp",
    width: "100%",
    height: 400,
    legendPosition: "top",
    textMaxLength: 15,
  },
  line: {
    graphColor: [
      "#6EB8F9",
      "#3282FA",
      "#4577C1",
      "#FDCB00",
      "#FF7900",
      "#B8D800",
      "#3CC3B4",
      "#FF4485",
      "#A94893",
      "#7257A8",
    ],
    showGrid: false,
    showLegend: false,
    iconType: "square", //'line' | 'plainline' | 'square' | 'rect'| 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | 'none'
    showValuesOnTop: false,
    strokeWidth: 1,
    fontSize: 12,
    textXAngle: -45,
    textColor: "#6E7191",
    timestamp: "collector_tstamp",
    width: "100%",
    height: 400,
    legendPosition: "top",
    type: "monotone", //linear
  },
  pie: {
    graphColor: [
      "#3282FA",
      "#6EB8F9",
      "#8CC8FA",
      "#00429A",
      "#005FB0",
      "#00C8F6",
      "#7CD8FB",
      "#0074B0",
      "#008BD0",
      "#4577C1",
    ],
    showGrid: false,
    showLegend: true,
    showLabel: true,
    iconType: "square", //'line' | 'plainline' | 'square' | 'rect'| 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | 'none'
    showValuesOnTop: true,
    pieSize: 100,
    innerRadius: 55,
    radius: 20,
    fontSize: 12,
    textXAngle: -45,
    textMaxLength: 20,
    textColor: "#6E7191",
    timestamp: "collector_tstamp",
    width: "100%",
    height: 400,
    legendPosition: "bottom",
  },
  piewithneedle: {
    graphColor: [
      "#3282FA",
      "#6EB8F9",
      "#8CC8FA",
      "#00429A",
      "#005FB0",
      "#00C8F6",
      "#7CD8FB",
      "#0074B0",
      "#008BD0",
      "#4577C1",
    ],
    showGrid: false,
    showLegend: false,
    iconType: "square", //'line' | 'plainline' | 'square' | 'rect'| 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | 'none'
    showValuesOnTop: true,
    pieSize: 120,
    innerRadius: 60,
    radius: 20,
    fontSize: 12,
    textXAngle: -45,
    textMaxLength: 20,
    textColor: "#6E7191",
    timestamp: "collector_tstamp",
    width: "100%",
    height: 400,
    legendPosition: "bottom",
  },
  area: {
    graphColor: [
      "#3282FA",
      "#6EB8F9",
      "#8CC8FA",
      "#00429A",
      "#005FB0",
      "#00C8F6",
      "#7CD8FB",
      "#0074B0",
      "#008BD0",
      "#4577C1",
    ],
    showGrid: false,
    showLegend: false,
    iconType: "square", //'line' | 'plainline' | 'square' | 'rect'| 'circle' | 'cross' | 'diamond' | 'square' | 'star' | 'triangle' | 'wye' | 'none'
    showValuesOnTop: false,
    strokeWidth: 3,
    radius: 0,
    fontSize: 12,
    textXAngle: -45,
    bigNumberSize: 90,
    mediumNumberSize: 40,
    textColor: "#6E7191",
    timestamp: "collector_tstamp",
    width: "100%",
    height: 400,
    legendPosition: "top",
    type: "monotone", //linear
  },
  chartType: {
    line: "echarts_timeseries_line",
    area: "echarts_area",
    distbar: "dist_bar",
    bar: "bar",
    bartimeseries: "echarts_timeseries_bar",
    barhorinzontal: "bar-horizontal",
    pie: "pie",
    piewithneedle: "gauge_chart",
    bignumber: "big_number",
    barhorizontal: "bar_horizontal",
  },
  dashBoardName: {
    userEngagement: 11,
    lms: 17,
    reportSnapshot: 17,
    webMaster: 14,
  },
  timeStampFormates: ["collector_tstamp", "data_date", "etl_tstamp"],
  LINE: "LINE",
  AREA: "AREA",
  BAR: "BAR",
  DISTBAR: "DISTBAR",
  BARTIMESERIES: "BARTIMESERIES",
  BARHORIZONTAL: "BARHORIZONTAL",
  PIE: "PIE",
  PIEWITHNEEDLE: "PIEWITHNEEDLE",
  BIGNUMBER: "BIGNUMBER",
};
