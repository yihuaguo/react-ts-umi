import netWorkConfig from '@/config/netWork';

// 16进制转10进制
export const to10_16 = (val: string) => eval(val).toString(16);

// id取链名
export const getChainName = (id: string) =>
  netWorkConfig[id]?.chainName || '未知链名';

export default {
  to10_16,
  getChainName,
};
