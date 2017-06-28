/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(time, city) {
  const chartWarp = document.getElementsByClassName("aqi-chart-wrap")[0];
  let i = 0,
      width = 0,
      colorList = [],
      cityName = "";
  //未选择城市时直接返回
  if (city === -1) {
    return;
  }
  //根据提供的city索引查找城市名字
  for (_cityName in aqiSourceData) {
    cityName = _cityName
    if (i == city) {
      break;
    }
    i++;
  }
  //设置宽度
  switch (time) {
    case "day":
      width = 10;
      break;
    case "week":
      width = 50;
      break;
    case "month":
      width = 300;
      break;

  }
  //设置颜色
  colorList = ["#ffc107", "#00bcd4", "#f44336", "#009688", "#ffeb3b"];
  //渲染
  //初始清空图表
  chartWarp.innerHTML = '';
  for (dataName in chartData[cityName][time]) {
    const item = document.createElement("div");
    let colorIndex = Math.floor(Math.random() * 4 + 1);
    item.title = dataName;
    item.style.cssText = `display: inline-block;
                          margin-left: 2px;
                          width: ${width}px;
                          height: ${chartData[cityName][time][dataName]}px;
                          background-color: ${colorList[colorIndex]};`;
    chartWarp.appendChild(item);
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
  // 确定是否选项发生了变化
  if (e.target.value === pageState.nowGraTime) {
    return;
  }
  // 设置对应数据
  pageState.nowGraTime = e.target.value;
  // 调用图表渲染函数
  renderChart(pageState.nowGraTime, pageState.nowSelectCity);
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 设置对应数据
  pageState.nowSelectCity = this.selectedIndex - 1;
  // 调用图表渲染函数
  renderChart(pageState.nowGraTime, pageState.nowSelectCity);
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  //初始化nowGraTime
  pageState.nowGraTime = document.querySelector("[name=\"gra-time\"][checked=\"checked\"]").value
  const radioList = document.querySelectorAll("[name=\"gra-time\"]");
  //给每一个radio添加click事件
  for (let i = 0; i < radioList.length; i++) {
    radioList[i].onclick = graTimeChange;
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  //初始化nowSelectCity
  pageState.nowSelectCity = -1;
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  const citySelect = document.getElementById("city-select");
  for (city in aqiSourceData) {
    const option = document.createElement("option");
    option.innerText = city;
    citySelect.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  for (city in aqiSourceData) {
    let weekData = 0,//一个自然周中的数据总数
        monthData = 0,//一个自然月的数据总数
        weekCount = 0,//统计自然周数
        count = 0;//统计自然周中的天数
    chartData[city] = {
      day: {},
      week: {},
      month: {}
    };

    for (date in aqiSourceData[city]) {
      let now = new Date(date),
          nowTest = new Date(date),
          nextDay = new Date(nowTest.setDate(now.getDate() + 1));//下一天
      //添加每日的数据
      chartData[city]["day"][date] = aqiSourceData[city][date];
      //添加自然周周的数据
      count++;
      weekData += aqiSourceData[city][date];
      //当前日期为周日时
      if (now.getDay() == 0) {
        chartData[city]["week"][`第${++weekCount}周`] = weekData / count;
        //重新设置为0
        count = 0;
        weekData = 0;
      }
      //添加自然月的数据
      monthData += aqiSourceData[city][date];
      //当日期为当前月的最后一天时
      if (now.getMonth() != nextDay.getMonth()) {
          chartData[city]["month"][`第${now.getMonth() + 1}月`] = monthData / now.getDate();
          //重新设置为0
          monthData = 0;
      }
    }
  }
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
