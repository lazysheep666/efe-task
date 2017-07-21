let init = function (data) {
  document.getElementById('one').classList.remove('choosed');
  document.getElementById('all').classList.add('choosed');
  const MAIN = document.getElementsByClassName('main')[0]
  let str = '<div class="warnning">';
  for (let i = 0; i < data.warnning.length; i++) {
    str += `<div class="warn-item">
              <i class="fa fa-star fa-2x ${data.icon.color[i]}">
              </i>
              ${data.warnning[i]}
            </div>`
  }
  str += '</div><div class="status">'
  for (let i = 0; i < data.status.length; i++) {
    str += `<div class="status-item">
              <i class="fa ${data.icon.name[i]} fa-2x default">
              </i>
              ${data.status[i]}
          </div>`
  }
  str += '</div><ul class="todo-list"></ul>';
  MAIN.innerHTML = str;
}

let showToDos = function (data) {
  let str = '';
  for (let i = 0; i < data.todos.length; i++) {
    console.log(data.todos[i]);
    str += `<li class="todo">
              <i class="fa ${data.icon.name[data.todos[i]['status-lev']]} fa-2x ${data.icon.color[data.todos[i]['warnning-lev']]}">
              </i>
              <p>
                ${data.todos[i].content}
              </p>
           </li>`
  }
  document.getElementsByClassName('todo-list')[0].innerHTML = str;
}

export default {
  init,
  showToDos
}
