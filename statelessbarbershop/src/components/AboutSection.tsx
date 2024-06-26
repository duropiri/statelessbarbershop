import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import CharByCharOnScroll from "./animations/CharByCharOnScroll";
import { FlipLink } from "./animations/RevealLinks";

interface ComponentProps {
  className?: string;
}

export default function AboutSection({ className }: ComponentProps) {
  const y = useMotionValue(0);
  const yTransform = useTransform(y, [0, 1], ["0%", "-100%"]);

  return (
    <section
      className={`${className} flex flex-col items-start justify-start w-full h-full bg-white py-[20vw]`}
    >
      {/* Header */}
      <header className="flex flex-col items-start justify-start w-full h-full px-4 sm:px-10 font-medium sm:font-semibold z-20">
        <div className="flex flex-row items-start justify-between w-full uppercase small-text mb-6 sm:mb-[4vw] z-10">
          <CharByCharOnScroll className="-mt-1" shadow end={70}>
            About
          </CharByCharOnScroll>
          <p className="">[S.02]</p>
        </div>
      </header>
      <div className="relative flex flex-col items-start justify-between w-full uppercase text-6xl font-semibold px-4 sm:px-10">
        <div className="sm:-mt-[10vw] flex flex-col w-full items-center justify-center z-10">
          <div className="hidden sm:block">
            <CharByCharOnScroll
              shadow
              lineStyles={{
                marginTop: "1.2ch", // Custom line height
                marginRight: "0ch", // Custom character spacing
              }}
              className="flex flex-col gap-x-4 w-[11ch] h-full tracking-[-0.015em] large-text text-center items-center justify-center font-medium uppercase mb-[10vw] cursor-default pointer-events-none"
              start={70}
              end={0}
            >
              Interested in all things creative
            </CharByCharOnScroll>
          </div>
          <div className="block sm:hidden">
            <CharByCharOnScroll
              shadow
              lineStyles={{
                marginTop: "1.2ch", // Custom line height
                marginRight: "0ch", // Custom character spacing
              }}
              className="flex flex-col gap-x-4 w-[11ch] h-full tracking-[-0.015em] large-text text-center items-center justify-center font-medium uppercase mb-[10vw] cursor-default pointer-events-none"
              start={80}
              end={50}
            >
              Interested in all things creative
            </CharByCharOnScroll>
          </div>
          <a
            href="/about"
            className="hidden sm:flex flex-col items-center justify-center w-auto"
          >
            <FlipLink
              inside="30"
              className="flex flex-col items-center justify-center bg-black px-4 py-2 rounded-full overflow-hidden small-text text-white h-full uppercase"
            >
              More About Stateless
            </FlipLink>
          </a>
        </div>

        <div className="sm:absolute top-1/2 flex flex-col items-center justify-between w-full gap-y-10 sm:flex-row sm:px-10 sm:-mx-10 text-white mix-blend-difference font-medium sm:font-medium mb-6 sm:mb-[4vw] z-10">
          <div className="flex flex-col items-center sm:items-start small-text text-center sm:text-start">
            <h1 className="mb-[4vw] sm:mb-[1vw]">[Stateless]</h1>
            <div className="sm:max-w-[40ch]">
              Creative Leader | Conceptual Marketer | Photographer |
              Videographer
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-center sm:items-end small-text text-center sm:text-end">
            <h1 className="mb-[4vw] sm:mb-[1vw]">[Stateless]</h1>
            <div className="sm:max-w-[40ch]">
              Creative Leader | Conceptual Marketer | Photographer |
              Videographer
            </div>
          </div>
        </div>

        <div className="sm:hidden flex flex-col items-center justify-center w-full">
          <FlipLink
            href="/about"
            inside="30"
            className="flex flex-col items-center justify-center bg-black px-4 py-2 rounded-full overflow-hidden small-text text-white h-full uppercase"
          >
            More About Stateless
          </FlipLink>
        </div>
      </div>
    </section>
  );
}
