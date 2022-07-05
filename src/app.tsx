import Web3 from 'web3';

// 可以修改菜单数据
// 可以和render配合后端动态渲染菜单
export function patchRoutes(routes: any) {}

// 首次进入网站
export function render(oldRender: any) {
  const web3 = (window.ethereum && new Web3(window.ethereum)) || null;
  oldRender();
}

// 切换路由
export function onRouteChange(info: any) {
  window.scrollTo(0, 0);
}
