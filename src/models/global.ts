import { getUsers } from '@/services/test';
import storage from '@/utils/storage';

export default {
  namespace: 'global',
  state: {
    list: [],
    // 账户信息
    userInfo: {
      address: '', // 账户地址
      chain: '', // 当前链
    },
  },
  effects: {
    *userInfo({ payload = {} }, { put }: any) {
      storage.save('userInfo', payload);
      yield put({
        type: 'setUserInfo',
        payload: payload || {},
      });
    },
    // *setList({ payload = {} }, { call, put }: any): any {
    //     const response = yield call(getUsers, payload)
    //     console.log('response', response)
    //     yield put({
    //         type: 'addList',
    //         payload: payload || []
    //     });
    // },
  },
  reducers: {
    setUserInfo(state: any, action: any) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    // // state为之前的state所有数据
    // // action为put的数据，取payload
    // addList(state: any, action: any) {
    //     return {
    //         ...state,
    //         list: action.payload,
    //     };
    // },
  },
};
