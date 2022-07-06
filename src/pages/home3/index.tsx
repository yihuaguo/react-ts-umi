import './index.less';
import { Carousel } from 'antd';
import bg from '@/assets/bg.jpg';

const Home3: React.FC = () => {
  const contentStyle: React.CSSProperties = {
    height: '300px',
    background: '#364d79',
    width: '300px',
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <div style={{ width: 300 }}>
        <Carousel
          {...settings}
          // appendDots={(item: any) => {
          //   return <div
          //     style={{
          //       backgroundColor: "#ddd",
          //       borderRadius: "10px",
          //       padding: "10px",
          //       marginBottom: '-60px'
          //     }}
          //   >
          //     <ul style={{ margin: "0px" }}> {item} </ul>
          //   </div>
          // }}
        >
          <div>
            <img style={contentStyle} src={bg} />
          </div>
          <div>
            <img style={contentStyle} src={bg} />
          </div>
          <div>
            <img style={contentStyle} src={bg} />
          </div>
          <div>
            <img style={contentStyle} src={bg} />
          </div>
          <div>
            <img style={contentStyle} src={bg} />
          </div>
        </Carousel>
        <button className="bttn-unite bttn-lg bttn-primary">medium</button>
      </div>
    </>
  );
};

export default Home3;
