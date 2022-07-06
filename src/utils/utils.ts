import netWorkConfig from '@/config/netWork';

/**
 * @function 16进制转10进制
 * @param {string} val
 * @return {number} 转换结果
 */
export const to10_16 = (val: string): number => eval(val).toString(16);

/**
 * @function 链id获取链名
 * @param {number | undefined} id
 * @return {string} 链名
 */
export const getChainName = (id: number | undefined): string => {
  if (!id) return '';
  return netWorkConfig[id]?.chainName || '未知链名';
};

export default {
  to10_16,
  getChainName,
};
