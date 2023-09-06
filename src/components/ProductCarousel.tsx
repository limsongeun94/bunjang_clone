import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

interface IndexProps {
  img_arr: string[];
}

function ControlledCarousel({ img_arr }: IndexProps) {
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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {img_arr.map((el, i) => {
        return (
          <Carousel.Item key={i}>
            <div className="w-[428px] h-[428px] overflow-hidden">
              <img className="w-full h-full object-cover" src={el} />
            </div>
          </Carousel.Item>
        );
      })}

      {/* <Carousel.Item>
        <img src="/무제1.jpg" width="428px" height="428px" />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/무제1.jpg" width="428px" height="428px" />
      </Carousel.Item> */}
    </Carousel>
  );
}

export default ControlledCarousel;
