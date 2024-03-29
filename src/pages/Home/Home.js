import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../components/Images/31591df0-22b8-4b34-99d3-59dc2f5e3061.jpg";
import image2 from "../../components/Images/3125760.jpg";
const Home = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            src={image1}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <image1 text="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image2}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default Home;
