import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import Header from "@/components/animations/NavigationMenu";
import { NavLinks } from "@/data/navLinks";
import Footer from "@/components/Footer";

interface InnerProps {
  children: ReactNode;
}

const anim = (variants: Variants) => {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  };
};

const perspective: Variants = {
  initial: {
    scale: "0.4",
    y: "-50vh",
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  enter: {
    scale: "1",
    y: 0,
  },
  exit: {
    scale: 1,
    y: 0,
  },
};

const slide: Variants = {
  initial: {
    y: "100vh",
  },
  enter: {
    y: "0vh",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    y: "100vh",
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const opacity: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.5, // slight delay to allow other animations to complete
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Inner: React.FC<InnerProps> = ({ children }) => {
  return (
    <div className="bg-black w-full h-full">
      <motion.div
        className="w-full h-full fixed left-0 top-0 bg-red-500"
        {...anim(slide)}
      />
      <motion.div
        className="bg-transparent w-full h-full"
        {...anim(perspective)}
      >
        <motion.div {...anim(opacity)}>
          <Header navigation={NavLinks} />
          {children}
          <Footer className="z-10" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Inner;
