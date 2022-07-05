import Web3 from 'web3';
import { abi as nftAbi, address as nftAddress } from './abi/nft';
import storage from '../storage';
const web3 = new Web3(window.ethereum);

const sendObj = {
  from: storage.get('userInfo').address,
  gas: '230000',
  gasPrice: await web3.eth.getGasPrice(),
};

// 铸币
export const mint = async (url, price = 0) => {
  const contract = new web3.eth.Contract(nftAbi, nftAddress);
  // 为了传递小数,需要转wei单位
  const newPrice = web3.utils.toWei(price, 'ether');
  return new Promise(async (resolve, reject) => {
    await contract.methods
      .mint(url, newPrice)
      .send(sendObj)
      .on('confirmation', (a) => {
        resolve(a);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

// 购买nft
export const buyNft = async (id, price) => {
  const contract = new web3.eth.Contract(nftAbi, nftAddress);
  const sendObjOfValue = Object.assign(sendObj, {
    value: web3.utils.toWei(price, 'ether'),
  });
  return new Promise(async (resolve, reject) => {
    await contract.methods
      .handleTransfer(id)
      .send(sendObjOfValue)
      .on('confirmation', (a) => {
        resolve(a);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};

export default {
  mint,
  buyNft,
};
