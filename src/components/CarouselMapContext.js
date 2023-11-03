import React, { createContext, useRef, useState } from "react";

const CarouselMapContext = createContext(null);

export const CarouselMapProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [pinIndex, setPinIndex] = useState(null);
  const carouselRef = useRef(null);
  const mapRef = useRef(null);

  const changeSlide = (slideIndex) => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(slideIndex);
    }
  };

  const goToMarker = (index, markers) => {
    if (mapRef.current && markers[index]) {
      const { latitude, longitude } = markers[index].coordinates;
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <CarouselMapContext.Provider
      value={{
        carouselRef,
        changeSlide,
        goToMarker,
        location,
        setLocation,
        mapRef
      }}
    >
      {children}
    </CarouselMapContext.Provider>
  );
};

export default CarouselMapContext;
