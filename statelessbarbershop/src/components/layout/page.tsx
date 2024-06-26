// layout/page.tsx
"use client";
import React, { ReactNode, useEffect } from "react";
import {
  SplashScreenProvider,
  useSplashScreen,
} from "@/contexts/SplashScreenContext";
import SuspenseFallback from "@/components/SuspenseFallback";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  const { isLoaded, finishLoading, isAnimating, finishAnimation } =
    useSplashScreen();

  useEffect(() => {
    if (!isLoaded) {
      finishLoading();
    }
  }, [isLoaded, finishLoading]);

  return (
    <SplashScreenProvider>
      <div className="relative flex w-full min-h-screen flex-col items-center justify-start overflow-hidden">
        {/* Splash Screen Overlay */}
        {(!isLoaded || isAnimating) && (
          <SuspenseFallback
            finishLoading={finishLoading}
            finishAnimation={finishAnimation}
          />
        )}
        {children}
      </div>
    </SplashScreenProvider>
  );
};

export default Page;
