import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      controls={isHover ? true : false}
      className="product_carousel w-[428px] h-[428px]"
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Carousel.Item>
        <img src="/무제1.jpg" width="428px" height="428px" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/무제1.jpg" width="428px" height="428px" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/무제1.jpg" width="428px" height="428px" />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
