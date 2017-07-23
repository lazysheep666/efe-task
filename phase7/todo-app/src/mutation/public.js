import view from '../view/view.js';

let backToPage = function (data) {
  if (data.page === 'one') {
    view.oneView(data.todos);
  } else {
    view.allView(data);
  }
}

export default {
  backToPage
};
