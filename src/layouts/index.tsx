import { getAddress, getChain } from '@/utils/web3';
import React, { ReactElement, useEffect, useState } from 'react';
import { getChainName } from '@/utils/utils';
import { connect } from 'umi';
import storage from '@/utils/storage';
import styles from './index.less';

interface Props {
  dispatch: Function;
  children: ReactElement;
  userInfo: {
    address: string;
    chain: string;
  };
}

const Layout = ({ userInfo, dispatch, children }: Props) => {
  const [isConnect, setIsConnect] = useState(false);

  const setUserInfo = async (
    originAddress?: string,
    originalChain?: string,
  ) => {
    const address = originAddress || window.ethereum.selectedAddress;
    if (!address) return;
    const chain = originalChain || getChainName(await getChain()) || '未知链名';
    const payload = { address, chain };
    dispatch({
      type: 'global/setUserInfo',
      payload,
    });
    storage.save('userInfo', payload);
    setIsConnect(true);
  };

  const removeUserInfo = async () => {
    dispatch({
      type: 'global/setUserInfo',
      payload: {
        address: undefined,
        chain: undefined,
      },
    });
    storage.remove('userInfo');
    setIsConnect(false);
  };

  useEffect(() => {
    setUserInfo();
    // 监控账户切换
    window.ethereum.on('accountsChanged', async (addressList: Array<any>) => {
      if (addressList.length) {
        setUserInfo(addressList[0], userInfo.chain);
      } else {
        removeUserInfo();
      }
    });
    // 监控网络切换
    window.ethereum.on('chainChanged', async () => {
      const chain = getChainName(await getChain());
      setUserInfo(userInfo.address, chain);
    });
  }, []);

  const connect = async () => {
    if (isConnect) return;
    await getAddress();
  };

  return (
    <>
      <header className={styles.header}>
        <button onClick={connect}>
          {isConnect ? userInfo.address : 'connect'}
        </button>
        <p>{userInfo.chain}</p>
      </header>
      {
        //  传递数据给子路由
        React.Children.map(children, (child: any) => {
          return React.cloneElement(child, { theme: '#ffffff' });
        })
      }
    </>
  );
};

export default connect(({ global }: any) => ({
  userInfo: global.userInfo,
}))(Layout);
