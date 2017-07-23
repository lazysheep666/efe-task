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

export default {
  changeToOne,
  changeToALL
}
