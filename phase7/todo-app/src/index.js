import './style/style.less';
import 'font-awesome-webpack';
import data from './data/data.js';
import view from './view/view.js';
import headMut from './mutation/header.js';
import footMut from './mutation/footer.js';
import mainEditMut from './mutation/main_edit.js';
import mainAllOneMut from './mutation/main_all_and_one.js';

if (!localStorage.toDoData) {
  localStorage.toDoData = JSON.stringify(data);
}
//获得数据
let toDoData = JSON.parse(localStorage.toDoData);
//渲染初始页面
if (toDoData.page === 'one') {
  view.oneView(toDoData.todos)
} else {
  view.allView(toDoData);
}

//添加header部分的事件处理程序
const HEADER = new Hammer(document.getElementsByClassName('header')[0]);
HEADER.on('tap', (e) => {
  switch (e.target.id) {
    case 'add':
      headMut.addToDo(toDoData);
      break;
    case 'cancle':
      headMut.cancle(toDoData);
      break;
    case 'add-done':
      headMut.addDone(toDoData);
      break;
    case 'edit-done':
      headMut.editDone(e.target.dataset.index, toDoData);
      break;
    default:
      return;
  }
});

//添加main部分的事件处理程序
const MAIN = new Hammer(document.getElementsByClassName('main')[0]);
MAIN.on('tap', (e) => {
  switch (e.target.className) {
    case 'edit-warn-item':
      mainEditMut.chooseWarn(e);
      break;
    case 'edit-status-item':
      mainEditMut.chooseStatus(e);
      break;
    default:
      return;
  }
})
MAIN.on('tap', (e) => {
  let classList = e.target.classList;
  let index = e.target.parentElement.parentElement.dataset.index;
  if (classList.contains('edit-todo')) {
    mainAllOneMut.editToDo(index, toDoData);
  } else if (classList.contains('delete-todo')) {
    mainAllOneMut.deleteToDo(index, toDoData);
  } else if (classList.contains('doing-todo')) {
    mainAllOneMut.doingToDo(index, toDoData);
  } else if (classList.contains('need-todo')) {
    mainAllOneMut.needToDo(index, toDoData);
  } else if (classList.contains('complete-todo')) {
    mainAllOneMut.completeToDo(index, toDoData);
  } else {
    return;
  }
})
MAIN.on('swipeleft', (e) => {
  if (e.target.className === 'todo') {
    mainAllOneMut.showOperateOne(e.target.dataset.index);
  }
  else {
    return;
  }
});
MAIN.on('swiperight', (e) => {
  if (e.target.className === 'todo') {
    mainAllOneMut.showOperateTwo(e.target.dataset.index);
  }
  else {
    return;
  }
});

//添加footer部分的事件处理程序
const FOOTER = new Hammer(document.getElementsByClassName('footer')[0]);
FOOTER.on('tap', (e) => {
  switch (e.target.id) {
    case 'one':
      footMut.changeToOne(toDoData);
      break;
    case 'all':
      footMut.changeToALL(toDoData);
      break;
    default:
      return;
  }
});
