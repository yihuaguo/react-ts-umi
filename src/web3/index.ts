import Web3 from 'web3';
import { message } from 'antd';
import netWorkConfig from '@/config/netWork';

const web3 = (window.ethereum && new Web3(window.ethereum)) || null;

// 是否安装mateMask
export const noMetaMask = () => {
  if (!web3) {
    message.error('请安装MetaMask! 如果已安装请刷新页面!');
    return true;
  }
};

// 返回当前网络
export const getChain = async () => {
  if (noMetaMask()) return;
  try {
    return await web3.utils.hexToNumber(window.ethereum.chainId);
  } catch (error) {
    message.error('获取网络错误!');
    return false;
  }
};

// 切换网络
export const changeChain = async (id = 1) => {
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

// 返回钱包地址
export const getAddress = async () => {
  if (noMetaMask()) return;
  try {
    const maskInfo = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return maskInfo[0];
  } catch (e) {
    message.error('连接钱包失败!');
    return false;
  }
};

// 返回钱包账户余额
export const getEth = async (adress: string) => {
  if (noMetaMask()) return;
  try {
    const bal = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [adress, 'latest'],
    });
    if (bal.length > 0) {
      return parseInt(bal, 16) / 1e18;
    } else {
      return '0';
    }
  } catch (e) {
    message.error('获取余额失败!');
    return false;
  }
};

// 获取账户签名
const getAutographValue = async (address: string) =>
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
      return false;
    });

// 发起审批
export const approve = async () => {
  if (noMetaMask()) return;
  const currentId = await getChain();
  if (!currentId) return false;
  if (!(await changeChain(currentId))) return false;
  const address = await getAddress();
  if (address) {
    const result = await getAutographValue(address);
    if (result) {
      return result;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default {
  approve,
  getChain,
  getAddress,
  getEth,
  changeChain,
};
