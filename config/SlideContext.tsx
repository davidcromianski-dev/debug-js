import React, { createContext, useContext, useState } from "react";

// @ts-ignore
const SlideContext = createContext();

export const useSlide = () => useContext(SlideContext);

export const SlideProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSlideId, setCurrentSlideId] = useState(1);

  return (
    <SlideContext.Provider value={{ currentSlideId, setCurrentSlideId }}>
      {children}
    </SlideContext.Provider>
  );
};
