import React, { createContext, useRef } from 'react';

const CarouselContext = createContext(null);

export const CarouselProvider = ({ children }) => {
  const carouselRef = useRef(null);

  const changeSlide = (slideIndex) => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(slideIndex);
    }
  };

  return (
    <CarouselContext.Provider value={{ carouselRef, changeSlide }}>
      {children}
    </CarouselContext.Provider>
  );
};

export default CarouselContext;