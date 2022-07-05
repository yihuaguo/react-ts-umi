import { useRef, useState } from 'react';
import './index.less';
import bg from '@/assets/bg.jpg';

export default function LazyImage(props: any) {
  const {
    style = {},
    src = '',
    alt = '',
    errImg = <div>error</div>,
    loadingImg = bg,
  } = props;
  const imgRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [neededSrc, setNeededSrc] = useState(loadingImg || src);

  // 加载失败
  const onError = (obj: any) => {
    setNeededSrc(<div>error</div>);
  };

  // img加载
  const onLoad = (url: string) => {
    setError(false);
    const imgDom = new Image();
    imgDom.src = url;
    imgDom.onload = function () {
      setNeededSrc(url);
    };
    imgDom.onerror = () => {
      onError({});
    };
  };

  // 加载成功返回渲染
  return (
    <div ref={imgRef} className="img">
      <img
        style={style}
        src={neededSrc}
        alt={alt}
        onLoad={() => onLoad(props?.src)}
        onError={() => onError({ url: errImg })}
      />
    </div>
  );
}
