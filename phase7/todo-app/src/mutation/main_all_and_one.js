import view from '../view/view.js';
import publicMet from './public.js';

let showOperateOne = function (index) {
  document.getElementById('cancle').classList.remove('hide');
  document.getElementsByClassName('hd-btn')[1].classList.add('hide');
  const OP_ONE = document.getElementsByClassName('operate-one');
  const OP_TWO = document.getElementsByClassName('operate-two');
  for (let i = 0; i < OP_ONE.length; i++) {
    if (OP_ONE[i].parentElement.dataset.index === index) {
      OP_ONE[i].style.display = 'flex';
      OP_TWO[i].style.display = 'none';
    }
  }
};

let showOperateTwo = function (index) {
  document.getElementById('cancle').classList.remove('hide');
  document.getElementsByClassName('hd-btn')[1].classList.add('hide');
  const OP_ONE = document.getElementsByClassName('operate-one');
  const OP_TWO = document.getElementsByClassName('operate-two');
  for (let i = 0; i < OP_ONE.length; i++) {
    if (OP_ONE[i].parentElement.dataset.index === index) {
      OP_ONE[i].style.display = 'none';
      OP_TWO[i].style.display = 'flex';
    }
  }
};

let editToDo = function (index, data) {
  view.editView(index, data);
  let warnLev = data.todos[index]['warnning-lev'];
  let staLev = data.todos[index]['status-lev'];
  document.getElementsByClassName('edit-warn-item')[warnLev]
          .classList
          .add('item-choosed');
  document.getElementsByClassName('edit-status-item')[staLev]
          .classList
          .add('item-choosed');
};

let deleteToDo = function (index, data) {
  data.todos.splice(index, 1);
  localStorage.toDoData = JSON.stringify(data);
  publicMet.backToPage(data);
};

let doingToDo = function (index, data) {
  data.todos[index]['status-lev'] = 0;
  localStorage.toDoData = JSON.stringify(data);
  publicMet.backToPage(data);
}

let needToDo = function (index, data) {
  data.todos[index]['status-lev'] = 1;
  localStorage.toDoData = JSON.stringify(data);
  publicMet.backToPage(data);
}

let completeToDo = function (index, data) {
  data.todos[index]['status-lev'] = 2;
  localStorage.toDoData = JSON.stringify(data);
  publicMet.backToPage(data);
}

export default {
  showOperateOne,
  showOperateTwo,
  editToDo,
  deleteToDo,
  doingToDo,
  needToDo,
  completeToDo
}
