import request from '@/utils/request';

export async function getUsers(params = {}) {
  return request('POST', '/api/users', {
    query: {
      name: 'zhangsan',
    },
    data: {
      age: 18,
    },
  });
}
