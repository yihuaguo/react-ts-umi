import Web3 from 'web3';
import { message } from 'antd';
import netWorkConfig from '@/config/netWork';

const web3 = (window.ethereum && new Web3(window.ethereum)) || null;

/**
 * @function 没有安装mateMask
 * @return {boolean | undefined} true(没安装) false(已安装)
 */
export const noMetaMask = (): boolean | undefined => {
  if (!web3) {
    message.error('请安装MetaMask! 如果已安装请刷新页面!');
    return true;
  }
};

/**
 * @function 返回当前网络id
 * @return {number | undefined}
 */
export const getChain = async (): Promise<number | undefined> => {
  if (noMetaMask()) return;
  try {
    return await web3.utils.hexToNumber(window.ethereum.chainId);
  } catch (error) {
    message.error('获取网络错误!');
    return;
  }
};

/**
 * @function 切换网络
 * @param {number} id
 * @return {boolean | undefined}
 */
export const changeChain = async (
  id: number = 1,
): Promise<boolean | undefined> => {
  if (noMetaMask()) return;
  // 成功状态
  let pass = true;
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: web3.utils.numberToHex(id),
        },
      ],
    });
  } catch (e: any) {
    if (e.code === 4902) {
      // 当前钱包没有该网络，需要新增该网络
      await window.ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [netWorkConfig[id]],
        })
        .then(() => {})
        .catch((e: any) => {
          message.error('新增网络失败!');
          pass = false;
        });
    } else {
      message.error('切换网络失败!');
      pass = false;
    }
  }
  return pass;
};

/**
 * @function 返回钱包地址
 * @return {string | undefined}
 */
export const getAddress = async (): Promise<string | undefined> => {
  if (noMetaMask()) return;
  try {
    const maskInfo = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return maskInfo[0];
  } catch (e) {
    message.error('连接钱包失败!');
    return;
  }
};

/**
 * @function 返回钱包账户余额
 * @param {string} address
 * @return {number | undefined}
 */
export const getEth = async (address: string): Promise<number | undefined> => {
  if (noMetaMask()) return;
  try {
    const bal = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });
    if (bal.length > 0) {
      return parseInt(bal, 16) / 1e18;
    } else {
      return 0;
    }
  } catch (e) {
    message.error('获取余额失败!');
    return;
  }
};

/**
 * @function 获取账户签名 (私有方法, 请不要直接调用)
 * @param {string} address
 * @return {string | undefined}
 */
const getAutographValue = async (
  address: string,
): Promise<string | undefined> =>
  web3.eth.personal
    .sign(
      web3.utils.utf8ToHex(
        `Welcome to Element! Click "Sign" to sign in. No password needed!`,
      ),
      address,
    )
    .then((res: string) => {
      return res;
    })
    .catch((e: any) => {
      message.error('钱包签名失败!');
      return;
    });

/**
 * @function 发起审批
 * @return {undefined | string}
 */
export const approve = async (): Promise<string | undefined> => {
  if (noMetaMask()) return;
  const currentId = await getChain();
  if (!currentId) return;
  if (!(await changeChain(currentId))) return;
  const address = await getAddress();
  if (address) {
    const result = await getAutographValue(address);
    return result || undefined;
  } else {
    return;
  }
};

export default {
  approve,
  getChain,
  getAddress,
  getEth,
  changeChain,
};
