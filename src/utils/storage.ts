import store from 'store';

interface Storage {
  /**
   * @function 设置(修改)localStorage
   * @param {string} key 键
   * @param {string} value 值
   * @return {void}
   */
  save: (key: string, value: any) => void;
  /**
   * @function 获取localStorage
   * @param {string} key 键
   * @return {any}
   */
  get: (key: string) => any;
  /**
   * @function 删除localStorage
   * @param {string} key 键
   * @return {any}
   */
  remove: (key: string) => void;
}

const storage: Storage = {
  save(key, value) {
    store.set(key, value);
  },

  get(key) {
    return store.get(key) || {};
  },

  remove(key) {
    store.remove(key);
  },
};

export default storage;
