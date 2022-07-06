import { getUsers } from '@/services/test';
import storage from '@/utils/storage';

interface Globa extends ModalInit {
  state: {
    list: [];
    userInfo: {
      address: string | undefined;
      chain: string | undefined;
    };
  };
}

const global: Globa = {
  namespace: 'global',
  state: {
    list: [],
    // 账户信息
    userInfo: {
      address: undefined, // 账户地址
      chain: undefined, // 当前链
    },
  },
  effects: {
    *userInfo({ payload = {} }, { put }) {
      storage.save('userInfo', payload);
      yield put({
        type: 'setUserInfo',
        payload: payload || {},
      });
    },
    // *setList({ payload = {} }, { call, put }) {
    //     const response = yield call(getUsers, payload)
    //     console.log('response', response)
    //     yield put({
    //         type: 'addList',
    //         payload: payload || []
    //     });
    // },
  },
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload,
      };
    },
    // // state为之前的state所有数据
    // // action为put的数据，取payload
    // addList(state, action) {
    //     return {
    //         ...state,
    //         list: action.payload,
    //     };
    // },
  },
};

export default global;
