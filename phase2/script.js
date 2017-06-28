/**
 * 移入目标元素（包含子元素）时触发
 *
 * @event .nav-item
 * @param {Object} e 事件对象
 */

// function showSubNav(e) {
// 	const SUB_ITEMS = e.currentTarget.getElementsByClassName('nav-sub')[0];
// 	SUB_ITEMS.style.display = 'block';
// }
//
// /**
//  * 移出目标元素（包含子元素）时触发
//  *
//  * @event .nav-item
//  * @param {Object} e 事件对象
//  */
//
// function hideSubNav(e) {
// 	const SUB_ITEMS = e.currentTarget.getElementsByClassName('nav-sub')[0];
// 	SUB_ITEMS.style.display = 'none';
// }
//
// const NAV_ITEMS = document.getElementsByClassName('nav-item');
// for (let i = 1, len = NAV_ITEMS.length; i < len; i++) {
// 	NAV_ITEMS[i].addEventListener('mouseover', showSubNav, false);
// 	NAV_ITEMS[i].addEventListener('mouseout', hideSubNav, false);
// }

/**
 * 切换照片按钮
 *
 * @param {number} index 当前照片的索引
 */

function changePicBtn(index) {

  const PIC_BTNS = document.getElementsByClassName('center-pic-changes')[0]
                           .getElementsByTagName('a');
  for (let i = 0, len = PIC_BTNS.length; i < len; i++) {
    if (i === index) {
      PIC_BTNS[i].classList.add('center-pic-on');
    }
    else {
      PIC_BTNS[i].classList.remove('center-pic-on');
    }
  }
  //当索引指向最后一张照片时
  if (index === 3) {
    PIC_BTNS[0].classList.add('center-pic-on');
  }
}

/**
 * 切换照片
 *
 * @return {Function} 返回了一个闭包用于setInterval的回调
 */

 function changePic() {
 	const PIC_COTANIER = document.getElementsByClassName('center-pic-container')[0];
	//向左的偏移量
 	let offsetLeft = document.querySelector('.center-pic img').clientWidth;
	//照片的索引初始为0
 	let index = 0;
 	return function () {
 		PIC_COTANIER.style.transform = `translateX(${++index * offsetLeft * -1}px)`;
		PIC_COTANIER.style.transition = 'all 0.5s ease';
    //改变照片的按钮
    changePicBtn(index);
		//当索引为最后一张照片时
		if (index === 3) {
			//等到最后一次过渡执行完成后
			setTimeout(() => {
				//索引重新指向第一张照片
				index = 0;
				//取消过渡动画
				PIC_COTANIER.style.transition = 'all 0.0s ease';
				//偏移量重新回到0
				PIC_COTANIER.style.transform = `translateX(0px)`;
			},
			500
		);
		}
 	};
 }

/**
 * 点击tab时触发
 *
 * @event [class="execl-tab-"]
 * @param {Object} e 事件对象
 */

function changeTab(e) {
  //指向当前tab的索引
  let index = 1;
  //所有表的数组
  const TABLES = document.getElementsByClassName('execl-table');
  for (let i = 0, len = TABS.length; i < len; i++) {
    //更新当前index
    index = e.currentTarget === TABS[i] ? i : index;
    TABS[i].classList.remove('execl-tab-on');
    TABLES[i].classList.remove('execl-table-on');
  }
  //当前tab和table添加选中样式
  e.currentTarget.classList.add('execl-tab-on');
  TABLES[index].classList.add('execl-table-on');
}

/**
 * 点击时触发
 * 显示下拉选项
 * @event .select-item
 * @param {Object} e 事件对象
 */

function showChoices(e) {
  const CHOICES = e.currentTarget
                   .nextSibling
                   .nextSibling;
  CHOICES.classList.toggle('select-on');
}

/**
 * 失去焦点时触发
 * 隐藏下拉选项
 * @event .select-item
 * @param {Object} e 事件对象
 */

function hideChoices(e) {
    const CHOICES = e.currentTarget
                     .nextSibling
                     .nextSibling;
    CHOICES.classList.remove('select-on');
}

/**
 * 鼠标按下时触发
 * 选中选项
 * @event .select-country | .select-city
 * @param {Object} e 事件对象
 */

function makeChoice(e) {
  let val = e.currentTarget
             .innerText;
  const SELECT_ITEM = e.currentTarget
                       .parentNode
                       .previousSibling
                       .previousSibling;
  SELECT_ITEM.value = val;
}

/**
 * 鼠标按下时触发
 * 给城市的下拉表添加城市的选项
 * @event .country-choice
 * @param {Object} e 事件对象
 */

function addChoices(e) {
  let area = {
    '无': ['无'],
    '中国': ['北京', '上海', '广州'],
    '美国': ['洛杉矶', '纽约', '旧金山'],
    '英国': ['伦敦', '利物浦', '曼切斯特']
  };
  let country = e.currentTarget.innerText;
  let city = area[country];
  const CITY_CHOICES = document.getElementsByClassName('city-choices')[0];
  //初始选项
  CITY_CHOICES.innerHTML = '';
  let stringHTML = '';
  for (let i = 0, len = city.length; i < len; i++) {
    stringHTML += `<div class="city-choice">${city[i]}</div>`;
  }
  //添加选项
  CITY_CHOICES.innerHTML = stringHTML;
  //给下拉框设置初始值
  document.getElementById('select-city').value = city[0]
  const CITIES = document.getElementsByClassName('city-choice');
  for (const CITY of CITIES) {
    CITY.addEventListener('mousedown', makeChoice, false);
  }
}



/**
 * 主函数
 */

setInterval(changePic(), 2000);

const TABS = document.getElementsByClassName('execl-tab');
for (const TAB of TABS) {
  TAB.addEventListener('click', changeTab, false);
}
//所有的下拉表
const SELECT_ITEMS = document.getElementsByClassName('select-item');
//国家的所有选项
const COUNTRYS = document.getElementsByClassName('country-choice');
for (const SELECT_ITEM of SELECT_ITEMS) {
  SELECT_ITEM.addEventListener('click', showChoices, false);
  SELECT_ITEM.addEventListener('blur', hideChoices, false);
}
for (const COUNTRY of COUNTRYS) {
  COUNTRY.addEventListener('mousedown', makeChoice, false);
  COUNTRY.addEventListener('mousedown', addChoices, false);
}
