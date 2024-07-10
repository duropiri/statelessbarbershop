// layout/page.tsx
"use client";
import React, { ReactNode, useEffect } from "react";
import {
  PreloaderProvider,
  usePreloader,
} from "@/contexts/PreloaderContext";
import Preloader from "@/components/Preloader";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  const { isLoaded, finishLoading, isAnimating, finishAnimation } =
    usePreloader();

  useEffect(() => {
    if (!isLoaded) {
      finishLoading();
    }
  }, [isLoaded, finishLoading]);

  return (
    <PreloaderProvider>
      <div className="relative flex w-full min-h-screen flex-col items-center justify-start overflow-hidden">
        {/* Splash Screen Overlay */}
        {(!isLoaded || isAnimating) && (
          <Preloader
            finishLoading={finishLoading}
            finishAnimation={finishAnimation}
          />
        )}
        {children}
      </div>
    </PreloaderProvider>
  );
};

export default Page;
