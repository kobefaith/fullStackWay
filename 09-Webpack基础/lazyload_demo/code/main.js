
function component() {
  var element = document.createElement('div');
  var button = document.createElement('button');
  var br = document.createElement('br');
  button.innerHTML = '点击后查看console';
  element.innerHTML = 'webpack 懒加载demo';
  element.appendChild(br);
  element.appendChild(button);
  button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
    print();
  }); 
  return element;
}
document.body.appendChild(component());