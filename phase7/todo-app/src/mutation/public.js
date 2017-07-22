import view from '../view/view.js';
let changeToOne = function (data) {
  //改变数据
  data.page = "one";
  localStorage.toDoData = JSON.stringify(data);
  //渲染视图
  view.oneView(data.todos);
};

let changeToALL = function (data) {
  //改变数据
  data.page = "all";
  localStorage.toDoData = JSON.stringify(data);
  //渲染视图
  view.allView(data);
};

let addToDo = function (data) {
  view.addView(data);
}

let backToPage = function (data) {
  if (data.page === 'one') {
    view.oneView(data.todos);
  } else {
    view.allView(data);
  }
}

let chooseWarn = function (e) {
  const WA_ITEMS = document.getElementsByClassName('edit-warn-item');
  for (let i = 0, len = WA_ITEMS.length; i < len; i++) {
    WA_ITEMS[i].classList.remove('item-choosed');
  }
  e.target.classList.add('item-choosed')
}

let chooseStatus = function (e) {
  const STA_ITEMS = document.getElementsByClassName('edit-status-item');
  for (let i = 0, len = STA_ITEMS.length; i < len; i++) {
    STA_ITEMS[i].classList.remove('item-choosed');
  }
  e.target.classList.add('item-choosed')
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

    backToPage(data);
  }
}

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
  backToPage(data);
};

let doingToDo = function (index, data) {
  data.todos[index]['status-lev'] = 0;
  localStorage.toDoData = JSON.stringify(data);
  backToPage(data);
}

let needToDo = function (index, data) {
  data.todos[index]['status-lev'] = 1;
  localStorage.toDoData = JSON.stringify(data);
  backToPage(data);
}

let completeToDo = function (index, data) {
  data.todos[index]['status-lev'] = 2;
  localStorage.toDoData = JSON.stringify(data);
  backToPage(data);
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

    backToPage(data);
  }
}
export default {
  changeToOne,
  changeToALL,
  chooseWarn,
  chooseStatus,
  addToDo,
  backToPage,
  addDone,
  showOperateOne,
  showOperateTwo,
  editToDo,
  deleteToDo,
  doingToDo,
  needToDo,
  completeToDo,
  editDone
};
