import './style/style.less';
import data from './data/data.js';
import oneView from './view/one.js'
import allView from './view/all.js'

// if (!localStorage.toDoData) {
  localStorage.toDoData = JSON.stringify(data);
// }
//获得数据
let toDoData = JSON.parse(localStorage.toDoData);
//渲染初始页面
if (toDoData.page === 'one') {
  oneView.init();
  oneView.showToDo(toDoData.todos);
} else {
  allView.init(toDoData);
  allView.showToDos(toDoData);
}
