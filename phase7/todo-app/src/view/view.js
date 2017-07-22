//总的视图渲染函数的入口文件
import one from './one.js';
import all from './all.js';
import add from './add.js';
import edit from './edit.js';
let oneView = function (data) {
  one.showNav();
  one.init();
  one.showToDo(data)
}

let allView = function (data) {
  all.showNav();
  all.init(data);
  all.showToDos(data);
}

let addView = function (data) {
  add.showNav();
  add.init(data);
}

let editView = function (index, data) {
  edit.showNav(index);
  edit.init(index, data);
}
export default {
  oneView,
  allView,
  addView,
  editView
}
