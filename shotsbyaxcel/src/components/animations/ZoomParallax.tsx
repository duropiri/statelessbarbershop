"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimationProps {
  children?: React.ReactNode;
  className?: string;
  media: Media[];
}

interface Media {
  src: string;
  alt: string;
  type: string;
  scale: number;
  top?: string | null;
  left?: string | null;
  width?: string | null;
  height?: string | null;
  fit?: string;
}

export default function ZoomParallax({
  children,
  className,
  media,
}: AnimationProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Create a list of scale transforms based on provided scaleFactors
  const scales = media.map((item, index) =>
    useTransform(scrollYProgress, [0, 1], [1, item.scale])
  );

  const blurs = media.map((item, index) =>
    index !== 0 ? useTransform(scrollYProgress, [0, 1], [0, 50]) : 0
  );

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {media.map((item, index) => {
          return (
            <motion.div
              key={index}
              style={{
                scale: scales[index] || 1,
              }}
              className={styles.element}
            >
              {item.type === "image" && (
                <div
                  style={{
                    top: item.top || "0%", // Default to '0%' if not specified
                    left: item.left || "0%",
                    width: item.width || "25vw", // Default to '25vw' if not specified
                    height: item.height || "25vh", // Default to '25vw' if not specified
                  }}
                  className={styles.imageContainer}
                >
                  <Image
                    src={item.src}
                    fill
                    alt={item.alt}
                    //   placeholder="blur"
                    objectFit={item.fit || "cover"}
                  />
                </div>
              )}
              {item.type === "video" && (
                <div
                  style={{
                    top: item.top || "0%", // Default to '0%' if not specified
                    left: item.left || "0%",
                    width: item.width || "25vw", // Default to '25vw' if not specified
                    height: item.height || "25vh", // Default to '25vw' if not specified
                  }}
                  className={styles.imageContainer}
                >
                  <video
                    src={item.src}
                    autoPlay={true}
                    controls={false}
                    loop
                    muted
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: "h-[300vh] w-full relative",
  sticky: "sticky top-0 h-[100vh] w-full overflow-hidden",
  element: "w-full h-full absolute top-0 flex items-center justify-center",
  imageContainer: "relative",
};

//Example media array
const media = [
  {
    src: "/img/logo-red-black.png",
    alt: "image",
    type: "image",
    scale: 1.2,
    width: "16vw",
    height: "25vh",
    fit: "contain",
  },
  {
    src: "/video/henna 3.mp4",
    alt: "video",
    type: "video",
    scale: 6,
    top: "-30vh",
    left: "5vw",
    width: "35vw",
    height: "30vh",
  },
  {
    src: "/video/hair 1.mp4",
    alt: "video",
    type: "video",
    scale: 7,
    top: "-20vh",
    left: "-25.5vw",
    width: "23.5vw",
    height: "65vh",
  },
  {
    src: "/video/hair 2.mp4",
    alt: "video",
    type: "video",
    scale: 5,
    top: null,
    left: "27.5vw",
    width: "25vw",
    height: "25vh",
  },
  {
    src: "/video/hair 4.mp4",
    alt: "video",
    type: "video",
    scale: 7,
    top: "30vh",
    left: "5vw",
    width: "20vw",
    height: "30vh",
  },
  {
    src: "/video/henna 2.mp4",
    alt: "video",
    type: "video",
    scale: 8,
    top: "30vh",
    left: "-22.5vw",
    width: "30vw",
    height: "30vh",
  },
  {
    src: "/video/hair 3.mp4",
    alt: "video",
    type: "video",
    scale: 11,
    top: "30vh",
    left: "37vw",
    width: "6vw",
    height: "30vh",
  },
  {
    src: "/video/henna 1.mp4",
    alt: "video",
    type: "video",
    scale: 9,
    top: "30vh",
    left: "25vw",
    width: "15vw",
    height: "30vh",
  },
  {
    src: "/video/henna 4.mp4",
    alt: "video",
    type: "video",
    scale: 8,
    top: "-30vh",
    left: "32vw",
    width: "15vw",
    height: "30vh",
  },
];