"use client";
import React, { useEffect, useState } from "react";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroVideo from "@/components/HeroVideo";
import LatestSection from "@/components/LatestSection";
import { Videos } from "@/data/videos";
import  { Projects } from "@/data/projects";

export default function Body() {
  // const [videos, setVideos] = useState<Video[]>([]);
  // const [projects, setProjects] = useState<Project[]>([]);

  // useEffect(() => {
  //   const loadContent = async () => {
  //     const [fetchedVideos, fetchedProjects] = await Promise.all([
  //       fetchVideos(),
  //       fetchProjects(),
  //     ]);
  //     setVideos(fetchedVideos);
  //     setProjects(fetchedProjects);
  //     console.log('Content loaded:', { fetchedVideos, fetchedProjects }); // Debugging statement
  //   };
  //   loadContent();
  // }, []);

  // if (videos.length === 0 || projects.length === 0) {
  //   console.log('Videos or projects length is zero'); // Debugging statement
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="relative flex w-full min-h-screen flex-col items-center justify-start overflow-hidden">
      <HeroVideo className="" videos={Videos} />
      <LatestSection className="" projects={Projects} />
      <AboutSection className="" />
      <ContactSection className="" />
    </div>
  );
}
