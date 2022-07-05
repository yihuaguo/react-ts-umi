/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';

/** 配置request请求时的默认参数 */
const orgRequest = extend({
  credentials: 'include', // 默认请求是否带上cookie
  //   prefix: '/api/v1',
  //   timeout: 1000,
});

// request拦截器
orgRequest.interceptors.request.use((url, options) => {
  return {
    url,
    options,
  };
});

// response拦截器
orgRequest.interceptors.response.use((response, options) => {
  return response;
});

const request = (method: string, url: string, params = {}, data = {}) => {
  return orgRequest(url, {
    method,
    params,
    data,
  });
};

export default request;
