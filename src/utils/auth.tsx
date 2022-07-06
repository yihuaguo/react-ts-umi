import { Redirect } from 'umi';

// 权限模块 适用于路由
const homeAuth = (props: any) => {
  const pass = true;
  if (pass) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/welcome" />;
  }
};

export default homeAuth;
