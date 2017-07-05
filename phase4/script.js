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
      + '<tr class="row">'
      +   `<td>${productName}</td>`
      +   `<td>${productPrice}</td>`
      +   '<td class="rs-table-edit">Edite</td>'
      +   '<td class="rs-table-delete">Delete</td>'
      + '</tr>';
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
    } else {
      if (maxHeight === LS_NAV.clientHeight) {
        //当左侧导航滑到低并点击收回二级导航时
        //导航的长度收缩
        LS_NAV.style.height = LS_NAV.clientHeight - CURR_NAV_SUBS.clientHeight + 'px';
      }
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
  }
  else if (event.target.className === 'rs-table-delete') {
    document.body.classList.add('prevent-scroll');
    showMask();
  }
  else {
    return;
  }
}

function showMask() {
  const MASK = document.getElementsByClassName('mask')[0];
  MASK.style.height = document.body.clientHeight + 'px';
}

function preventDefault(event) {
  event.preventDefault();
  return false;
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
window.addEventListener('scroll', showFixedHead, false);
window.addEventListener('scroll', addLsNavHeight, false);

const RS_TABLE = document.getElementsByClassName('rs-table')[0];
RS_TABLE.addEventListener('click', handleTable, false);
