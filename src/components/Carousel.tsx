"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import type { Banner } from '@/interface';

// type Banner = { url: string }[];
interface CarouselProps {
  banner_img: Banner[]
}

function ControlledCarousel({ banner_img }: CarouselProps) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      indicators={false}
      interval={2000}
    >
      {banner_img.map((item) => {
        return (
          <Carousel.Item>
            <img className="d-block w-100" src={item.url} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ControlledCarousel;
