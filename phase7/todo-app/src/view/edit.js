let showNav = function (index) {
  const HD_BTN_1 = document.getElementsByClassName('hd-btn')[1];
  HD_BTN_1.id = 'edit-done'
  HD_BTN_1.innerText = 'Done';
  HD_BTN_1.classList.remove('hide');
  HD_BTN_1.dataset.index = index
  document.getElementById('cancle')
          .classList
          .remove('hide');
}

let init = function (index, data) {
  const MAIN = document.getElementsByClassName('main')[0]
  let str = '<div class="edit-warnning">';
  for (let i = 0; i < data.warnning.length; i++) {
    str += `<div class="edit-warn-item">
              <i class="fa fa-star fa-2x ${data.icon.color[i]}">
              </i>
              ${data.warnning[i]}
            </div>`
  }
  str += '</div><div class="edit-status">'
  for (let i = 0; i < data.status.length; i++) {
    str += `<div class="edit-status-item">
              <i class="fa ${data.icon.name[i]} fa-2x default">
              </i>
              ${data.status[i]}
          </div>`
  }
  str += `</div><input class="edit-content" type="textarea" name="" value='${data.todos[index].content}' >`
  MAIN.innerHTML = str;
}

export default {
  showNav,
  init
};
