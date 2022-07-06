import Web3 from 'web3';
import 'nprogress/nprogress.css';
import nprogress from 'nprogress';
import React from 'react';

// 可以修改菜单数据
// 可以和render配合后端动态渲染菜单
export function patchRoutes(routes: any) {
  console.log('patchRoutes');
}

// 首次进入网站
export function render(oldRender: any) {
  console.log('render');
  nprogress.start();
  const web3 = (window.ethereum && new Web3(window.ethereum)) || null;
  oldRender();
}

// 切换路由
export function onRouteChange(info: any) {
  window.scrollTo(0, 0);
  nprogress.config;
  nprogress.done();
}
