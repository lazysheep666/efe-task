import view from '../view/view.js';
import publicMet from './public.js';

let addToDo = function (data) {
  view.addView(data);
}

let cancle = function (data) {
  publicMet.backToPage(data);
}

let addDone = function (data) {
  let content = document.getElementsByClassName('edit-content')[0]
                        .value;
  const WA_ITEMS = document.getElementsByClassName('edit-warn-item');
  let warnLev = -1;
  for (let i = 0, len = WA_ITEMS.length; i < len; i++) {
    if (WA_ITEMS[i].classList.contains('item-choosed')) {
      warnLev = i;
      break;
    }
  }
  const STA_ITEMS = document.getElementsByClassName('edit-status-item');
  let staLev = -1;
  for (let i = 0, len = STA_ITEMS.length; i < len; i++) {
    if (STA_ITEMS[i].classList.contains('item-choosed')) {
      staLev = i;
      break;
    }
  }

  if (warnLev != -1 && staLev != -1 && content) {
    let todo = {};
    todo.content = content;
    todo['warnning-lev'] = warnLev;
    todo['status-lev'] = staLev;
    data.todos.push(todo);
    localStorage.toDoData = JSON.stringify(data);

    publicMet.backToPage(data);
  }
}

let editDone = function (index, data) {
  let content = document.getElementsByClassName('edit-content')[0]
                        .value;
  const WA_ITEMS = document.getElementsByClassName('edit-warn-item');
  let warnLev = -1;
  for (let i = 0, len = WA_ITEMS.length; i < len; i++) {
    if (WA_ITEMS[i].classList.contains('item-choosed')) {
      warnLev = i;
      break;
    }
  }
  const STA_ITEMS = document.getElementsByClassName('edit-status-item');
  let staLev = -1;
  for (let i = 0, len = STA_ITEMS.length; i < len; i++) {
    if (STA_ITEMS[i].classList.contains('item-choosed')) {
      staLev = i;
      break;
    }
  }

  if (warnLev != -1 && staLev != -1 && content) {
    data.todos[index]['warnning-lev'] = warnLev;
    data.todos[index]['status-lev'] = staLev;
    data.todos[index].content = content;

    localStorage.toDoData = JSON.stringify(data);

    publicMet.backToPage(data);
  }
}

export default {
  addToDo,
  cancle,
  addDone,
  editDone
}
