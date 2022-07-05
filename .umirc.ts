import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/',
  hash: true,
  history: {
    type: 'hash',
  },
  title: 'test_app',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      routes: [
        { path: '/', redirect: '/welcome' },
        { path: '/welcome', exact: true, component: '@/pages/Welcome.tsx' },
        {
          path: '/',
          component: '@/layouts',
          routes: [
            {
              path: '/home',
              wrappers: ['@/utils/auth'],
              exact: true,
              component: '@/pages/home',
            },
            { path: '/home2', exact: true, component: '@/pages/home2' },
            { path: '/home3', exact: true, component: '@/pages/home3' },
            { component: '@/pages/404.tsx' },
          ],
        },
      ],
    },
  ],
  fastRefresh: {},
  dva: {},
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
});
