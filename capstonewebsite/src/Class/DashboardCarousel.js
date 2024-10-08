import React, { useState, useEffect, useCallback } from "react";

const DashboardCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, images.length]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]); 

  return (
    <div className="w-full mx-auto pb-2 pt-2">
      <div className="relative rounded-2xl drop-shadow-lg overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="min-w-full h-[500px] bg-center bg-cover"
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 transition-all  bg-[#00000048] drop-shadow-md text-white hover:text-[#ffffff8f] p-2 rounded-full hover:bg-[#00000011]"
          onClick={prevSlide}
        >
          ❮
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 transition-all  bg-[#00000048] drop-shadow-md text-white hover:text-[#ffffff8f] p-2 rounded-full hover:bg-[#00000011]"
          onClick={nextSlide}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default DashboardCarousel;
