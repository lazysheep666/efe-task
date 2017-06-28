/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	const aqiCityInput = document.getElementById("aqi-city-input");
	const aqiValueInput = document.getElementById("aqi-value-input");
	let city = aqiCityInput.value.trim(),
	    value = aqiValueInput.value.trim(),
			flag = 1;
	if (!/^[A-Za-z\u4E00-\u9FA5]+$/.test(city)) {
		flag = 0;
		alert("城市名字必须为中英文字符");
	}
	if (!/^\d+$/.test(value)) {
		flag = 0;
		alert("空气质量必须为整数!");
	}
	if (flag) {
		value = parseInt(value);
		aqiData[city] = value;
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	const aqiTable = document.getElementById("aqi-table");
	aqiTable.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for (city in aqiData) {
		const tableItem = document.createElement("tr");
		tableItem.innerHTML = `<td>${city}</td><td>${aqiData[city]}</td><td><button class="del-btn">删除</button></td>`;
		aqiTable.appendChild(tableItem);
	}


}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
	let removeCity = target.parentNode.parentNode.childNodes[0].innerText;
	delete aqiData[removeCity];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	const addBtn = document.getElementById("add-btn"),
				table = document.getElementById("aqi-table");
	addBtn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	table.addEventListener("click", function (e) {
		if (e.target.nodeName.toLowerCase() === "button") {
			delBtnHandle(e.target)
		}
	}, false)


}

init();
