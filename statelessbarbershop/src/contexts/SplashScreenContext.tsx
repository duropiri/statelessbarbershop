// contexts/SplashScreenContext.tsx
"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SplashScreenContextProps {
  isLoaded: boolean;
  isAnimating: boolean;
  finishLoading: () => void;
  finishAnimation: () => void;
}

const SplashScreenContext = createContext<SplashScreenContextProps | undefined>(undefined);

export const useSplashScreen = () => {
  const context = useContext(SplashScreenContext);
  if (!context) {
    throw new Error("useSplashScreen must be used within a SplashScreenProvider");
  }
  return context;
};

export const SplashScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // console.log(`Context - isLoaded: ${isLoaded}, isAnimating: ${isAnimating}`);
  }, [isLoaded, isAnimating]);

  const finishLoading = () => {
    // console.log("finishLoading called");
    setIsLoaded(true);
  };

  const finishAnimation = () => {
    // console.log("finishAnimation called");
    setIsAnimating(false);
  };

  return (
    <SplashScreenContext.Provider
      value={{
        isLoaded,
        isAnimating,
        finishLoading,
        finishAnimation,
      }}
    >
      {children}
    </SplashScreenContext.Provider>
  );
};
