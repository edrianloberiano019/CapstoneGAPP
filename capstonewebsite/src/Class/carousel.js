import React, { useState, useEffect } from "react";

const Carousel = ({ images, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="absolute inset-0 flex">
          {images.map((image, i) => (
            <div
              key={i}
              className={`w-full flex-shrink-0 ${
                i === index ? "block" : "hidden"
              }`}
            >
              <img className="w-full h-screen object-cover" src={image} alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
