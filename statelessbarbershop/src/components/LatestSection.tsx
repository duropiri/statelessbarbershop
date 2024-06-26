import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import CharByCharOnScroll from "./animations/CharByCharOnScroll";
import { FlipLink } from "./animations/RevealLinks";

interface ComponentProps {
  className?: string;
  projects: Project[];
}

interface Project {
  name: string;
  brand: string;
  type: string;
  duration?: string | number;
  src: string;
}

export default function LatestSection({ className, projects }: ComponentProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const negativeY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const positiveY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getWidthClass = (index: number) => {
    let denominator = 2; // Starting denominator (w-1/2)
    let count = 1;

    // Determine the correct denominator based on the index
    for (let i = 0; i <= index; i++) {
      if (count > denominator) {
        denominator++;
        count = 1;
      }
      count++;
    }

    return denominator;
  };

  return (
    <section
      className={`${className} relative flex flex-col items-start justify-start w-full h-full bg-white`}
    >
      {/* Header */}
      <header className="flex flex-col items-start justify-start w-full h-full p-4 sm:p-10 font-medium sm:font-semibold">
        <div className="flex flex-row items-start justify-between w-full uppercase small-text mb-6 sm:mb-[4vw]">
          <CharByCharOnScroll className="-mt-1" shadow end={70}>
            Latest Work
          </CharByCharOnScroll>
          <p className="">[S.01]</p>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between w-full mb-[10vw] sm:mb-[2vw]">
          <div className="flex flex-row w-auto h-[10vw] items-start justify-start">
            <CharByCharOnScroll
              shadow
              className="w-full sm:w-auto h-full -translate-y-[4vw] sm:-translate-y-[3.2vw] -mr-[6vw] tracking-[-0.015em] large-text font-medium uppercase"
              end={60}
            >
              Latest
            </CharByCharOnScroll>
            <div className="z-10 medium-text lg:-translate-y-[1vw]">
              [{projects.length.toFixed(1)}]
            </div>
          </div>
          <FlipLink
            href="/work"
            className="mt-1 sm:mt-0 -mr-[2vw] medium-text h-full uppercase"
          >
            <a href="/work" className="md:font-semibold">
              <CharByCharOnScroll
                className="-translate-y-[1vw]"
                shadow
                end={70}
              >
                All Work
              </CharByCharOnScroll>
            </a>
          </FlipLink>
        </div>
      </header>
      <ul
        ref={ref}
        className="flex flex-row flex-wrap items-start justify-between w-full h-full gap-y-[10vw] sm:gap-y-[5vw]"
      >
        {projects.map((project, index) => {
          return (
            <li
              key={"project-" + index}
              className={`flex-grow h-full overflow-hidden`}
              style={{
                width: isSmallScreen
                  ? "100%"
                  : `${100 / getWidthClass(index)}%`,
              }}
            >
              <a
                className="flex flex-col w-full h-full"
                href="#"
                aria-label="View project"
              >
                <div className="flex flex-row items-start justify-between w-full uppercase small-text font-regular mb-6 px-4 sm:px-8 gap-x-5">
                  <div className="flex flex-col items-start justify-between">
                    <div className="truncate max-w-[20ch]">{project.name}</div>
                    <div className="font-extrabold truncate max-w-[20ch]">
                      {project.brand}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div>{project.type}</div>
                    <div>{project.duration}</div>
                  </div>
                </div>
                <div
                  className="relative aspect-video followerchangetest overflow-hidden"
                  data-follower-text="[WATCH]"
                >
                  <motion.video
                    src={project.src}
                    autoPlay={false}
                    loop
                    muted // Ensure video element starts muted
                    className=""
                    onMouseOver={(e) => {
                      e.currentTarget.currentTime = 0; // Reset to the beginning
                      e.currentTarget.play();
                      e.currentTarget.style.transform = `scale(1.15)`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0; // Reset to the beginning
                      e.currentTarget.style.transform = `translate(0px, 0px) scale(1.25)`; // Reset position and scale on mouse out
                    }}
                    style={{
                      x: x,
                      y: y,
                      objectFit: "cover",
                      transform: "scale(1.25)", // Initial scale to avoid gaps
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const mouseX = e.clientX - rect.left; // x position within the element
                      const mouseY = e.clientY - rect.top; // y position within the element

                      const offsetX = -(mouseX - rect.width / 2) / 10; // Adjust the divisor to control the amount of shift
                      const offsetY = -(mouseY - rect.height / 2) / 10;

                      e.currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.15)`; // Apply both translate and scale
                    }}
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
