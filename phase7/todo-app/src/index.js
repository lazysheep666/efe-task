import './style/style.less';
import 'font-awesome-webpack';
import data from './data/data.js';
import view from './view/view.js';
import publicMut from './mutation/public.js';

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

// //添加切页面的事件处理程序

const HEADER = new Hammer(document.getElementsByClassName('header')[0]);
HEADER.on('tap', (e) => {
  switch (e.target.id) {
    case 'add':
      publicMut.addToDo(toDoData);
      break;
    case 'cancle':
      publicMut.backToPage(toDoData);
      break;
    case 'add-done':
      publicMut.addDone(toDoData);
      break;
    case 'edit-done':
      publicMut.editDone(e.target.dataset.index, toDoData);
      break;
    default:
      return;
  }
});

const MAIN = new Hammer(document.getElementsByClassName('main')[0]);
MAIN.on('tap', (e) => {
  switch (e.target.className) {
    case 'edit-warn-item':
      publicMut.chooseWarn(e);
      break;
    case 'edit-status-item':
    publicMut.chooseStatus(e);
      break;
    default:
      return;
  }
})
MAIN.on('tap', (e) => {
  let classList = e.target.classList;
  if (classList.contains('edit-todo')) {
    publicMut.editToDo(e.target.parentElement.parentElement.dataset.index, toDoData);
  } else if (classList.contains('delete-todo')) {
    publicMut.deleteToDo(e.target.parentElement.parentElement.dataset.index, toDoData);
  } else if (classList.contains('doing-todo')) {
    publicMut.doingToDo(e.target.parentElement.parentElement.dataset.index, toDoData);
  } else if (classList.contains('need-todo')) {
    publicMut.needToDo(e.target.parentElement.parentElement.dataset.index, toDoData);
  } else if (classList.contains('complete-todo')) {
    publicMut.completeToDo(e.target.parentElement.parentElement.dataset.index, toDoData);
  } else {
    return;
  }
})
MAIN.on('swipeleft', (e) => {
  if (e.target.className === 'todo') {
    publicMut.showOperateOne(e.target.dataset.index);
  }
  else {
    return;
  }
});
MAIN.on('swiperight', (e) => {
  if (e.target.className === 'todo') {
    publicMut.showOperateTwo(e.target.dataset.index);
  }
  else {
    return;
  }
});

const FOOTER = new Hammer(document.getElementsByClassName('footer')[0]);
FOOTER.on('tap', (e) => {
  switch (e.target.id) {
    case 'one':
      publicMut.changeToOne(toDoData);
      break;
    case 'all':
      publicMut.changeToALL(toDoData);
      break;
    default:
      return;
  }
});
