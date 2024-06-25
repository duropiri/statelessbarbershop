"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ComponentProps {
  videos?: Video[];
}

interface Video {
  title: string;
  src: string;
}

export const Videos = [
  { title: "Asake x Axcel", src: "/videos/video1.mp4" },
  { title: "New Balance x Axcel", src: "/videos/video2.mp4" },
  { title: "Usports x Axcel", src: "/videos/video3.mp4" },
  { title: "Montreal x Axcel", src: "/videos/video4.mp4" },
  { title: "Kidjvck x Axcel", src: "/videos/video5.mp4" },
];

export default function Body({ videos = Videos }: ComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null); // Reference to the main video element
  const secondaryVideoRef = useRef<HTMLVideoElement>(null); // Reference to the secondary video element
  const audioCtxRef = useRef<AudioContext | null>(null); // Reference to the AudioContext
  const gainNodeRef = useRef<GainNode | null>(null); // Reference to the GainNode
  const [isMuted, setIsMuted] = useState(true); // State to track whether the video is muted (controls the icon)
  const [isInitialized, setIsInitialized] = useState(false); // State to track whether the audio context is initialized
  const [isMuting, setIsMuting] = useState(false); // Flag to indicate if a mute operation is in progress
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current video index

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const negativeY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const positiveY = useTransform(scrollYProgress, [0, 1], ["0%", "450%"]);

  // Function to initialize the audio context and gain node
  const initializeAudio = () => {
    if (videoRef.current && !audioCtxRef.current) {
      // Create a new AudioContext
      const audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioCtxRef.current = audioCtx;

      // Create a MediaElementAudioSourceNode from the video element
      const sourceNode = audioCtx.createMediaElementSource(videoRef.current);
      // Create a GainNode to control the audio volume
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime); // Start with volume 0
      gainNodeRef.current = gainNode;

      // Connect the source node to the gain node and then to the audio context destination
      sourceNode.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      setIsInitialized(true); // Mark the audio context as initialized
    }
  };

  // Function to fade the audio in or out
  const fadeAudio = (mute: boolean) => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      // Cancel any scheduled volume changes
      gainNodeRef.current.gain.cancelScheduledValues(now);
      // Set the current volume value
      gainNodeRef.current.gain.setValueAtTime(
        gainNodeRef.current.gain.value,
        now
      );
      // Fade the volume to 0 if muting, or to 1 if unmuting over 1/2 a second
      gainNodeRef.current.gain.linearRampToValueAtTime(mute ? 0 : 1, now + 0.5);
    }
  };

  // Function to toggle the mute state
  const handleMuteToggle = () => {
    if (isMuting) return; // Prevent action if mute operation is in progress
    setIsMuting(true); // Set muting flag to prevent rapid toggles

    if (!isInitialized) {
      initializeAudio(); // Initialize the audio context if not already initialized
    }

    if (isMuted) {
      // Unmuting: fade audio in immediately
      fadeAudio(false);
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false; // Unmute the video element immediately
      }
      setIsMuting(false); // Clear muting flag
    } else {
      // Muting: change SVG immediately and fade audio out
      setIsMuted(true);
      fadeAudio(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = true; // Mute the video element after 1 second
        }
        setIsMuting(false); // Clear muting flag after mute operation is completed
      }, 500);
    }
  };

  // Function to handle changing the video sources
  const handleVideoChange = () => {
    const nextIndex = (currentIndex + 1) % videos.length; // Get the next index in the array
    if (videoRef.current && secondaryVideoRef.current) {
      videoRef.current.src = videos[nextIndex].src; // Update the main video source
      videoRef.current.play(); // Start playing the main video

      const previewIndex = (nextIndex + 1) % videos.length; // Get the next preview index
      secondaryVideoRef.current.src = videos[previewIndex].src; // Update the preview video source
      secondaryVideoRef.current.play(); // Start playing the preview video
    }
    setIsMuted(true);

    setCurrentIndex(nextIndex); // Update the current index state
  };

  // Effect to start the video muted and playing automatically
  useEffect(() => {
    if (videoRef.current && secondaryVideoRef.current) {
      videoRef.current.muted = true; // Ensure video starts muted
      videoRef.current.src = videos[currentIndex].src; // Set initial video source
      videoRef.current.play().catch(Error); // Start playing video and handle errors
      // .catch((error) => console.log("Error playing video:", error)); // Start playing video and handle errors

      secondaryVideoRef.current.src =
        videos[(currentIndex + 1) % videos.length].src; // Set initial preview video source
      secondaryVideoRef.current.play().catch(Error); // Start playing preview video and handle errors
      // .catch((error) => console.log("Error playing preview video:", error)); // Start playing preview video and handle errors

      // Add event listener for video end to cycle to the next video
      const handleEnded = () => {
        handleVideoChange();
      };

      videoRef.current.addEventListener("ended", handleEnded);

      // Clean up the event listener
      return () => {
        videoRef.current?.removeEventListener("ended", handleEnded);
      };
    }
  }, [videos, currentIndex]);

  // GSAP Animations
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      let effectElements = gsap.utils.toArray("[data-speed]");
      effectElements.forEach((el: any) => {
        let speed = parseFloat(el.getAttribute("data-speed"));
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              onRefresh: (self) => {
                let start = Math.max(0, self.start); // ensure no negative values
                let distance = self.end - start;
                let end = start + distance / speed;
                (self as any).setPositions(start, end);
                if (self.animation) {
                  // Check if self.animation is defined
                  (self as any).animation.vars.y = (end - start) * (1 - speed);
                  self.animation
                    .invalidate()
                    .progress(1)
                    .progress(self.progress);
                }
              },
            },
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    };

    loadGSAP();
  }, []);
  return (
    <section className="relative flex flex-col items-center justify-center h-[100vh] overflow-hidden bg-black">
      <div className="absolute flex flex-col items-start justify-center text-white left-0 bottom-1/2  text-2xl large-text font-black ml-4 sm:ml-10 mix-blend-difference uppercase max-w-[10ch] z-10 leading-none">
        404
        <a
          href="/"
          className="group mt-1 sm:mt-0 -mr-[2vw] flex flex-row medium-text"
          aria-label="Visit Contact Page"
        >
          <div className="flex flex-row w-full h-full items-start">
            <svg
              className="rotate-90 w-6 group-hover:-rotate-0 duration-300"
              fill="none"
              viewBox="0 0 9 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m8.31628 7.1891-8.31628 4.8014.00000042-9.6028z"
                fill="currentColor"
              ></path>
            </svg>
            <span className="md:group-hover:translate-x-2 duration-300 md:font-semibold">
              Go Back
            </span>
          </div>
        </a>
      </div>
      <motion.div
        className="relative flex w-[100vh] sm:w-[100vw] h-[100vw] sm:h-[100vh] rotate-90 sm:rotate-0 overflow-hidden"
        // style={{ y: positiveY }}

        data-speed="0.25"
      >
        <video
          ref={videoRef}
          autoPlay
          loop={false} // Do not loop the video to allow cycling to the next one
          muted // Ensure video element starts muted
          playsInline // Ensure video plays inline
          className="w-[100vh] sm:w-[100vw] h-[100vw] sm:h-[100vh] object-cover pointer-events-none"
        />
      </motion.div>
      <button
        className="group absolute w-[30%] sm:w-[20%] aspect-[9/16] sm:aspect-video left-0 bottom-0 ml-4 sm:ml-10 mb-3 sm:mb-6 object-cover cursor-pointer small-text"
        onClick={handleVideoChange}
        aria-label="Next Video"
      >
        <video
          ref={secondaryVideoRef}
          autoPlay
          loop
          muted // Ensure video element starts muted
          playsInline // Ensure video plays inline
          className="w-full h-full object-cover"
        />
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center absolute w-full h-full top-0 left-0 z-[99] pointer-events-none text-white text-center font-bold uppercase mix-blend-difference">
          <svg
            fill="none"
            height="14"
            viewBox="0 0 9 14"
            width="9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m8.31628 7.1891-8.31628 4.8014.00000042-9.6028z"
              fill="currentColor"
            ></path>
          </svg>
          <p className="md:group-hover:translate-x-2 duration-300">
            {videos[(currentIndex + 1) % videos.length].title}
          </p>
        </div>
      </button>

      <button
        onClick={handleMuteToggle}
        className="absolute mr-4 right-0 bottom-1/2 sm:translate-y-0 sm:mr-0 sm:right-auto sm:bottom-0 flex items-center justify-center rounded-full mix-blend-difference mb-3 sm:mb-6"
        aria-label="Mute or unmute video"
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 icon icon-tabler icon-tabler-volume-off text-white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24 24H0z" fill="none" />
            <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
            <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
            <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
            <path d="M3 3l18 18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 icon icon-tabler icon-tabler-volume text-white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24 24H0z" fill="none" />
            <path d="M15 8a5 5 0 0 1 0 8" />
            <path d="M17.7 5a9 9 0 0 1 0 14" />
            <path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" />
          </svg>
        )}
      </button>
    </section>
  );
}
