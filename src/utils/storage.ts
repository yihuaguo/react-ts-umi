import store from 'store';

const storage = {
  // 储存
  save(key: string, value: any) {
    console.log(key, value);
    store.set(key, value);
  },

  // 获取
  get(key: string) {
    return store.get(key) || {};
  },

  remove(key: string) {
    store.remove(key);
  },
};

export default storage;
