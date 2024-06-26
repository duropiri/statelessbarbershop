"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { getChars } from "./animations/NavigationMenu";

interface ComponentProps {
  className?: string;
  finishLoading: () => void;
}

export default function SplashScreen({
  className,
  finishLoading,
}: ComponentProps) {
  const controls = useAnimation();
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    // Animate the pulsating of the logo, then shrinking of the splash screen
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.8, ease: "easeInOut", loop: 1 },
    });

    // Loading percentage animation
    let startTime = Date.now();
    const duration = 2000; // Duration for loading animation
    const updateLoadingPercentage = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setLoadingPercentage(Math.round(progress));
      if (progress < 100) {
        requestAnimationFrame(updateLoadingPercentage);
      }
    };

    requestAnimationFrame(updateLoadingPercentage);

    // Shrink the splash screen from bottom to top
    setTimeout(() => {
      controls.start({
        clipPath: ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"],
        transition: { duration: 1.2, ease: [0.84, 0, 0.42, 1] },
      }).then(() => {
        setLoadingPercentage(100); // Ensure it shows 100% at the end
        finishLoading();
      });
    }, duration);
  }, [controls, finishLoading]);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden z-[99999] flex flex-col items-center justify-center bg-black cursor-wait splash-screen"
      animate={controls}
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      {/* The logo, centered */}
      <div className="z-10 select-none pointer-events-none flex flex-col">
        <div className="relative text-9xl uppercase font-extrabold text-white mix-blend-difference">
          Axcel
          <AnimatePresence>
            <span className="text-2xl">{getChars("Raul")}</span>
            <span className="text-3xl font-light">{getChars("®")}</span>
          </AnimatePresence>
        </div>

        {/* Loading percentage */}
        <div className="flex flex-row w-full items-center justify-between text-white text-lg mix-blend-difference uppercase">
          <div className="">Loading</div>
          <div className="">[{loadingPercentage}%]</div>
        </div>
      </div>
    </motion.div>
  );
}
