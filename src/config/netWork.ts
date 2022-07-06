import Web3 from 'web3';

interface NetWorkConfig {
  [propName: string]: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: [string];
    blockExplorerUrls: [string];
  };
}

const netWorkConfig: NetWorkConfig = {
  '1': {
    chainId: Web3.utils.numberToHex(1), // 目标链ID
    chainName: 'Mainnet', // 网络名称
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18, // 小数点
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'], // 节点
    blockExplorerUrls: ['https://etherscan.io'], // 区块链浏览器
  },
  '3': {
    chainId: Web3.utils.numberToHex(3),
    chainName: 'Ropsten',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://ropsten.infura.io/v3/'],
    blockExplorerUrls: ['https://ropsten.etherscan.io'],
  },
  '4': {
    chainId: Web3.utils.numberToHex(4),
    chainName: 'Rinkeby',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.infura.io/v3/'],
    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
  },
  '5': {
    chainId: Web3.utils.numberToHex(5),
    chainName: 'Goerli',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  '42': {
    chainId: Web3.utils.numberToHex(42),
    chainName: 'Kovan',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://kovan.infura.io/v3/'],
    blockExplorerUrls: ['https://kovan.etherscan.io'],
  },
};

export default netWorkConfig;
