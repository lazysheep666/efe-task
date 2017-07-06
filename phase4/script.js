/**
 * 浏览器加载二级导航的数据并生成导航树
 */
function getNavData() {
  const LS_NAV_SUBS = document.getElementsByClassName('ls-nav-subs');
  for (let i = 0, len = LS_NAV_SUBS.length; i < len; i++) {
    let subNavString = '';
    for (let j = 0; j < lsNavData[i].length; j++) {
      subNavString += `<li class="ls-nav-sub">${lsNavData[i][j]}</li>`;
    }
    LS_NAV_SUBS[i].innerHTML = subNavString;
  }
}

/**
 * 浏览器加载表格数据生成表格
 */
function getTableData() {
  const RS_TABLE = document.getElementsByClassName('rs-table')[0];
  let rsTableDataString = ''
    +  '<tr class="t-head being-fixed hide">'
    +    '<th>TableHead</th>'
    +    '<th>TableHead</th>'
    +    '<th>Head</th>'
    +    '<th>TableHead</th>'
    +  '</tr>'
    +  '<tr class="t-head">'
    +    '<th>TableHead</th>'
    +    '<th>TableHead</th>'
    +    '<th>Head</th>'
    +    '<th>TableHead</th>'
    +  '</tr>';
  for(let item in rsTableData) {
    let rowDataString = '';
    let productName = rsTableData[item].content.split(' ')[0];
    let productPrice = rsTableData[item].content.split(' ')[1];
    rowDataString = ''
      +  `<tr class="row" data-id="${rsTableData[item].id}"`
      +  `data-name="${rsTableData[item].name}" data-val="${rsTableData[item].value}">`
      +    `<td>${productName}</td>`
      +    `<td>${productPrice}</td>`
      +    '<td class="rs-table-edit">Edite</td>'
      +    '<td class="rs-table-delete">Delete</td>'
      +  '</tr>';
    rsTableDataString += rowDataString;
  }
  RS_TABLE.innerHTML = rsTableDataString;
}

/**
 * 当点击左侧一级导航时触发
 * 显示或者收起二级导航
 * @event .ls-nav
 */
function toggleLsSubNav(event) {
  if (event.target.className === 'ls-nav-sup') {
    const CURR_NAV_SUBS = event.target.nextElementSibling;
    if (CURR_NAV_SUBS.classList.contains('hide')) {
      CURR_NAV_SUBS.classList.remove('hide');
    }
    else {
      //导航的长度收缩
      LS_NAV.style.height = LS_NAV.clientHeight - CURR_NAV_SUBS.clientHeight + 'px';
      CURR_NAV_SUBS.classList.add('hide');
    }
    //每次点击重新设置maxHeight 并且重新设置导航的长度
    maxHeight = LS_NAV.scrollHeight;
    console.log(maxHeight);
    addLsNavHeight();

  } else {
    return;
  }
}

/**
 * 当浏览器窗口大小改变时触发或者浏览器滚动时
 * 自适应左侧栏的导航的高度
 * @event window
 */
function addLsNavHeight() {
  let pageHeight = document.documentElement.clientHeight;
  let newHeight = pageHeight - LS_NAV.getBoundingClientRect().top - 2;
  LS_NAV.style.height = maxHeight >= newHeight ? newHeight + 'px' : maxHeight + 'px';
 }

/**
 * 当浏览器窗口滚动时触发
 * 若右侧栏的表格表头的Top超出浏览器时，出现一个固定在浏览器窗口顶部的表头
 * @event window
 */
function showFixedHead() {
const TABLE = document.getElementsByClassName('rs-table')[0];
let tableOffsetTop = TABLE.offsetTop;
let tableOffsetLeft = TABLE.offsetLeft;
if (window.scrollY >= tableOffsetTop) {
  //固定的表头
  const F_HEAD = document.getElementsByTagName('table')[0]
                         .getElementsByClassName('being-fixed')[0];
  //表头
  const HEAD = document.getElementsByClassName('t-head')[1];
  F_HEAD.classList.remove('hide');
  //给固定表头设置偏移量保证其位于表格上方
  F_HEAD.style.left = tableOffsetLeft + 'px';
  F_HEAD.style.top = 0 + 'px';
  //固定表头的单元格
  const F_HEAD_ITEMS = F_HEAD.getElementsByTagName('th');
  //非固定的表头单元格
  const HEAD_ITEMS = HEAD.getElementsByTagName('th');
  //将非固定的表头的每个单元格的宽度赋值给固定表头的每个单元格的宽度
  for (let i = 0, len = F_HEAD_ITEMS.length; i < len; i++) {
    //注意要减去默认的2个像素的内边距的长
    F_HEAD_ITEMS[i].style.width = HEAD_ITEMS[i].clientWidth - 2 + 'px';
  }
}
else {
  const F_HEAD = document.getElementsByTagName('table')[0]
                         .getElementsByClassName('being-fixed')[0];
  F_HEAD.classList.add('hide');
}
}

/**
 * 当点击表格中的编辑或者删除时触发
 * 弹出相应的遮罩层
 * @event .rs-table
 */
function handleTable(event) {
  if (event.target.className === 'rs-table-edit') {
    //阻止浏览器滚动
    document.body.classList.add('prevent-scroll');
    showMask();
    showEditeBox(event);
  }
  else if (event.target.className === 'rs-table-delete') {
    document.body.classList.add('prevent-scroll');
    showMask();
    showDeleteBox();
  }
  else {
    return;
  }
  //编辑框跟删除框
  const POP_BOXS = document.getElementsByClassName('pop-box');
  for (const POP_BOX of POP_BOXS) {
    POP_BOX.dataset.id = event.target
                              .parentElement
                              .dataset.id;
  }
  //编辑框跟删除框的确认按钮
  const POP_CON_BTNS = document.getElementsByClassName('pop-box-confirm');
  //给编辑框的确定按钮添加修改表格数据事件
  POP_CON_BTNS[0].addEventListener('click', editeData, false);
  //给删除框的确定按钮添加删除表格数据事件
  POP_CON_BTNS[1].addEventListener('click', deleteData, false);
  //编辑框跟删除框的取消按钮
  const POP_CAN_BTNS = document.getElementsByClassName('pop-box-cancle');
  //将编辑框跟弹出框的data-id
  //设置为需要更改数据或删除数据的item的同一个data-id
  for (const POP_CAN_BTN of POP_CAN_BTNS) {
    POP_CAN_BTN.addEventListener('click', hideMask, false);
  }

}

/**
 * 弹出遮罩层
 */
function showMask() {
  const MASK = document.getElementsByClassName('mask')[0];
  MASK.style.height = document.body.clientHeight + 'px';
  MASK.classList.remove('hide');
}

/**
 * 点击取消时隐藏遮罩层以及弹出框
 * @event
 */
function hideMask(event) {
  //浏览器可以滑动
  document.body.classList.remove('prevent-scroll');
  //隐藏编辑框或者删除框
  event.currentTarget
       .parentElement
       .parentElement
       .classList
       .add('hide');
  //隐藏遮罩
  const MASK = document.getElementsByClassName('mask')[0];
  MASK.classList.add('hide');
}

/**
 * 弹出编辑框
 */
function showEditeBox(event) {
  const EDITE_BOX = document.getElementById('edite-box');
  EDITE_BOX.classList.remove('hide');

  let itemID = event.target
                    .parentElement
                    .dataset
                    .id;
  //初始化input框的值
  const EDITE_INPUTS = document.getElementById('edite-box')
                               .getElementsByTagName('input');
  EDITE_INPUTS[0].value = rsTableData[itemID].name;
  EDITE_INPUTS[1].value = rsTableData[itemID].content;
  EDITE_INPUTS[2].value = rsTableData[itemID].value;
  //设置弹出框的偏移
  setPopBoxOffset();
}

/**
 * 弹出删除框
 */
function showDeleteBox() {
  const DELETE_BOX = document.getElementById('delete-box');
  DELETE_BOX.classList.remove('hide');
  setPopBoxOffset();
}

/**
 * 设置弹出框的偏移
 */
function setPopBoxOffset() {
  const EDITE_BOXS = document.getElementsByClassName('pop-box');
  for (const EDITE_BOX of EDITE_BOXS) {
    EDITE_BOX.style.top = (document.documentElement.clientHeight / 2) - (EDITE_BOX.clientHeight) / 2 + 'px';
    EDITE_BOX.style.left = (document.documentElement.clientWidth / 2) - (EDITE_BOX.clientWidth) / 2 + 'px';
  }
}

/**
 * 点击编辑框的确认时修改数据
 * 并且隐藏遮罩层以及弹出框
 * @event
 */
function editeData(event) {
  let itemID = event.currentTarget
                    .parentElement
                    .parentElement
                    .dataset
                    .id;
  const EDITE_INPUTS = document.getElementById('edite-box')
                               .getElementsByTagName('input');

  let name = EDITE_INPUTS[0].value;
  let content = EDITE_INPUTS[1].value;
  let value = EDITE_INPUTS[2].value;
  //更新JSON对象中的数据
  rsTableData[itemID].name = name;
  rsTableData[itemID].content = content;
  rsTableData[itemID].value = value;
  //重新渲染表格
  getTableData();
  //隐藏遮罩层以及弹出框
  hideMask(event);
}

/**
 * 点击删除框的确认时删除数据
 * 并且隐藏遮罩层以及弹出框
 * @event
 */
function deleteData(event) {
  let itemID = event.currentTarget
                    .parentElement
                    .parentElement
                    .dataset
                    .id;
  //删除JSON对象中的数据
  delete rsTableData[itemID];
  //重新渲染表格
  getTableData();
  //隐藏遮罩层以及弹出框
  hideMask(event);
}

/**
* 主函数
*/
getNavData();
getTableData();
const LS_NAV = document.getElementsByClassName('ls-nav')[0];
let maxHeight = LS_NAV.scrollHeight;
addLsNavHeight();
LS_NAV.addEventListener('click', toggleLsSubNav, false);

window.addEventListener('resize', addLsNavHeight, false);
window.addEventListener('resize', setPopBoxOffset, false);
window.addEventListener('scroll', showFixedHead, false);
window.addEventListener('scroll', addLsNavHeight, false);

const RS_TABLE = document.getElementsByClassName('rs-table')[0];
RS_TABLE.addEventListener('click', handleTable, false);
