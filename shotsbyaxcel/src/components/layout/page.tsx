// layout/page.tsx
"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  SplashScreenProvider,
  useSplashScreen,
} from "@/contexts/SplashScreenContext";
import SuspenseFallback from "@/components/SuspenseFallback";
import fetchVideos from "@/data/videos";
import fetchProjects from "@/data/projects";

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  const { isLoaded, finishLoading, isAnimating, finishAnimation } = useSplashScreen();
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      await Promise.all([fetchVideos(), fetchProjects()]);
      setContentLoaded(true);
      finishLoading();
    };

    if (!isLoaded) {
      loadContent();
    }
  }, [isLoaded, finishLoading]);

  return (
    <SplashScreenProvider>
      <div className="relative flex w-full min-h-screen flex-col items-center justify-start overflow-hidden">
        {/* Splash Screen Overlay */}
        {(!isLoaded || isAnimating || !contentLoaded) && (
          <SuspenseFallback
            finishLoading={finishLoading}
            finishAnimation={finishAnimation}
            contentLoaded={contentLoaded} // Pass contentLoaded to SuspenseFallback
          />
        )}
        {children}
      </div>
    </SplashScreenProvider>
  );
};

export default Page;
