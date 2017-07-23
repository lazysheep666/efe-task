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

export default {
  chooseWarn,
  chooseStatus
}
