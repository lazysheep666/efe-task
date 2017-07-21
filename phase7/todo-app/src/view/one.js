let init = function (){
  document.getElementById('one').classList.add('choosed');
  document.getElementById('all').classList.remove('choosed');
  const MAIN = document.getElementsByClassName('main')[0];
  let str = ''
        +    '<div class="mn-title">'
        +      'Now! The One Thing is'
        +    '</div>'
        +    '<ul class="todo-list">'
        +    '</ul>';
  MAIN.innerHTML = str;
}

let showToDo = function (data) {
  for (let todo of data) {
    if (todo['status-lev'] === 1 && todo['warnning-lev'] === 1 ) {
      document.getElementsByClassName('todo-list')[0]
              .innerHTML = ''
                      +    '<li class="todo">'
                      +      '<i class="fa fa-play fa-2x important"></i>'
                      +      `<p>${todo.content}</p>`
                      +    '</li>'
    }
  }
}

export default {
  init,
  showToDo
};
