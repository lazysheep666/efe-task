window.onload = function () {
  let pageHeight = document.documentElement.clientHeight;
  console.log(pageHeight);
  const LS_NAV = document.getElementsByClassName('ls-nav')[0];
  LS_NAV.style.height = pageHeight - LS_NAV.offsetTop + 'px';
}
function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}
