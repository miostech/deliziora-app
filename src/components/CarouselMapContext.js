import React, { createContext, useRef, useState } from "react";

const CarouselMapContext = createContext(null);

export const CarouselMapProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [listType, setListType] = useState(true);
  const [pinIndex, setPinIndex] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // [latitude, longitude]
  const carouselRef = useRef(null);
  const mapRef = useRef(null);
  const [idRestaurant, setIdRestaurant] = useState(null); // Adicione esta linha

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
    console.log(Number(markers[index].latitude))
    if (mapRef.current && markers[index]) {
      mapRef.current.animateToRegion({
        latitude: Number(markers[index].latitude),
        longitude: Number(markers[index].longitude),
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
        userLocation,
        setUserLocation,
        idRestaurant, // Adicione esta linha
        setIdRestaurant, // Adicione esta linha
      }}
    >
      {children}
    </CarouselMapContext.Provider>
  );
};

export default CarouselMapContext;
