/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import {
  extend,
  RequestOptionsInit,
  OnionOptions,
  RequestInterceptor,
  ResponseInterceptor,
} from 'umi-request';

interface Request {
  (
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    params?: {
      query?: undefined | object;
      data?: undefined | object;
    },
  ): Promise<any>;
}

/** 配置request请求时的默认参数 */
const orgRequest: RequestOptionsInit = extend({
  credentials: 'include', // 默认请求是否带上cookie
  errorHandler: (err) => {}, // 异常处理
});

// request拦截器
orgRequest.interceptors.request.use(
  (url: RequestInterceptor, options: OnionOptions) => {
    return {
      url,
      options,
    };
  },
);

// response拦截器
orgRequest.interceptors.response.use(
  (response: ResponseInterceptor, options: OnionOptions) => {
    return response;
  },
);

const request: Request = (
  method: string,
  url: string,
  params = {
    query: undefined,
    data: undefined,
  },
) => {
  const { query, data } = params;
  // @ts-ignore
  return orgRequest(url, {
    method,
    params: query,
    data,
  });
};

export default request;
