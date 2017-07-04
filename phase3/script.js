/**
 * 当浏览器窗口大小改变时触发或者浏览器滚动时
 * 自适应左侧栏的导航的高度
 * @event window
 */

 function addLsNavHeight() {
   const LS_NAV = document.getElementsByClassName('ls-nav')[0];
   let maxHeight = LS_NAV.scrollHeight;
   return function () {
     let pageHeight = document.documentElement.clientHeight;
     let newHeight = pageHeight - LS_NAV.getBoundingClientRect().top;
     LS_NAV.style.height = maxHeight >= newHeight ? newHeight + 'px' : maxHeight + 'px';
   };
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
  const F_HEAD = document.getElementsByClassName('fixed-head')[0];
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
  const F_HEAD = document.getElementsByClassName('fixed-head')[0];
  F_HEAD.classList.add('hide');
}
}

/**
* 主函数
*/

addLsNavHeight()();
window.addEventListener('resize', addLsNavHeight(), false);
window.addEventListener('scroll', showFixedHead, false);
window.addEventListener('scroll', addLsNavHeight(), false);
