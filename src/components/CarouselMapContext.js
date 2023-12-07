import React, { createContext, useRef, useState } from "react";

const CarouselMapContext = createContext(null);

export const CarouselMapProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [listType, setListType] = useState(true);
  const [pinIndex, setPinIndex] = useState(null);
  const carouselRef = useRef(null);
  const mapRef = useRef(null);

  const changeSlide = (slideIndex) => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(slideIndex);
    }
  };

  const changeList = () => {
    setListType(!listType)
    console.log('changeList', listType)
  }

  const goToMarker = (index, markers) => {
    if (mapRef.current && markers[index]) {
      mapRef.current.animateToRegion({
        latitude: markers[index].latitude,
        longitude: markers[index].longitude,
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
        mapRef,
        listType,
        setListType,
        changeList,
      }}
    >
      {children}
    </CarouselMapContext.Provider>
  );
};

export default CarouselMapContext;
