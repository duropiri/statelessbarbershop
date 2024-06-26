"use client";
import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Inner from "@/components/layout/transitions/inner";
import { usePathname } from "next/navigation";
import Header from "@/components/animations/NavigationMenu";
import { NavLinks } from "@/data/navLinks";
import Footer from "@/components/Footer";

export const perspective = {
  initial: {
    scale: 1,
    y: "0vh",
  },
  enter: {
    scale: 1,
    y: "0vh",
  },
  exit: {
    scale: 0.9,
    y: "-10vh",
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const slide = {
  initial: {
    y: "100vh",
  },
  enter: {
    y: "100vh",
  },
  exit: {
    y: "0vh",
  },
};

export const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 1,
  },
};

interface TemplateProps {
  children: ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="w-full h-full bg-black">
      <motion.div
        className="w-full h-full fixed left-0 top-0 bg-white z-10 cursor-wait"
        variants={slide}
        initial={slide.initial}
        exit={slide.exit}
        animate={slide.enter}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
      <motion.div
        className="bg-white w-full h-full"
        variants={perspective}
        initial={perspective.initial}
        exit={perspective.exit}
        animate={perspective.enter}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <motion.div
          variants={opacity}
          initial={opacity.initial}
          exit={opacity.exit}
          animate={opacity.enter}
          transition={{
            duration: 0.2,
          }}
        >
          {/* <Header navigation={NavLinks} /> */}
          {children}
          <Footer className="z-10" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Template;
