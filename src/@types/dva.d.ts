interface InitState {
  [propsName: string]: any;
}

/**
 * 增加的参数
 * @param {string} namespace modal命名空间
 * @param {object} state modal基础数据
 * @param {Function} effects 调用reducers方法
 * @param {Function} reducers 修改state方法
 */
interface ModalInit {
  namespace: string;
  state: InitState;
  effects: {
    [propsName: string]: (
      paramsOptions: {
        payload?: object;
        callback?: Function;
      },
      sendOptions: {
        call: Function; // 异步获取数据
        put: Function;
      },
    ) => void;
  };
  reducers: {
    [propsName: string]: (
      state: InitState,
      action: {
        payload: any;
      },
    ) => void;
  };
}
