import { connect } from 'umi';
import { Button, Space } from 'antd';
import {
  getChain,
  getAddress,
  changeChain,
  getEth,
  approve,
} from '@/utils/web3';
import React from 'react';

const Home: React.FC = (props: any) => {
  console.log('props', props);

  return (
    <Space>
      <Button
        onClick={async () => {
          console.log('getAddress', await getAddress());
        }}
      >
        获取地址
      </Button>
      <Button
        onClick={async () => {
          console.log('getChain', await getChain());
        }}
      >
        获取当前网络
      </Button>
      <Button
        onClick={() => {
          changeChain(4);
        }}
      >
        切换网络
      </Button>
      <Button
        onClick={async () => {
          console.log(
            'getEth(props.userInfo.address)',
            await getEth(props.userInfo.address),
          );
        }}
      >
        获取账户余额
      </Button>
      <Button onClick={approve}>获取签名</Button>
    </Space>
  );
};

export default connect(({ global }: any) => ({
  userInfo: global.userInfo,
}))(Home);
