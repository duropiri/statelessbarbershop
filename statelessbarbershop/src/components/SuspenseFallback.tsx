// components/SuspenseFallback.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSplashScreen } from "@/contexts/SplashScreenContext";

interface SuspenseFallbackProps {
  finishLoading: () => void;
  finishAnimation: () => void;
}

const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({
  finishLoading,
  finishAnimation,
}) => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const { isAnimating } = useSplashScreen();

  useEffect(() => {
    const updateLoadingPercentage = (percentage: number) => {
      setLoadingPercentage(percentage);
      // console.log(`Loading percentage updated to: ${percentage}`);
    };

    const handleWindowLoad = () => {
      // console.log("Window loaded, updating loading percentage to 100");
      updateLoadingPercentage(100);
      finishLoading();
    };

    // Check if the window is already loaded
    if (document.readyState === "complete") {
      // console.log("Document ready state is complete, handling window load immediately");
      handleWindowLoad();
    } else {
      // console.log("Adding load event listener");
      window.addEventListener("load", handleWindowLoad);
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev < 99) {
          // console.log(`Incrementing loading percentage to: ${prev + 1}`);
          return prev + 1; // Increase percentage up to 99%
        }
        return prev;
      });
    }, 20); // Increase percentage every 20ms

    return () => {
      // console.log("Cleaning up load event listener and interval");
      window.removeEventListener("load", handleWindowLoad);
      clearInterval(interval);
    };
  }, [finishLoading]);

  useEffect(() => {
    if (loadingPercentage === 100) {
      // console.log("Loading complete, starting exit animation");
      const timer = setTimeout(() => {
        // console.log("Exit animation complete, finishing animation");
        finishAnimation();
      }, 1200); // Delay to match animation duration

      return () => clearTimeout(timer); // Clean up timer if component unmounts
    }
  }, [loadingPercentage, finishAnimation]);

  if (!isAnimating) {
    // console.log("Splash screen animation complete, removing splash screen");
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden z-[99999] flex flex-col items-center justify-center h-[100vh] bg-black cursor-wait splash-screen"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={{
        clipPath:
          loadingPercentage === 100
            ? "inset(0% 0% 100% 0%)"
            : "inset(0% 0% 0% 0%)",
      }}
      transition={{ duration: 1.2, ease: [0.84, 0, 0.42, 1] }}
      onAnimationComplete={() => {
        if (loadingPercentage === 100) {
          // console.log("Animation complete, calling finishAnimation");
          setTimeout(() => {
            finishAnimation();
          }, 1200); // Delay to match animation duration
        }
      }}
    >
      <motion.div
        className="z-10 select-none pointer-events-none flex flex-col"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="relative text-6xl sm:text-9xl uppercase font-extrabold text-white mix-blend-difference">
          Stateless
          <span className="text-sm sm:text-2xl"></span>
          <span className="text-lg sm:text-3xl font-light">®</span>
        </div>
        <div className="flex flex-row w-full items-center justify-between text-white text-lg mix-blend-difference uppercase">
          <div>Loading</div>
          <div>[{loadingPercentage}%]</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuspenseFallback;
