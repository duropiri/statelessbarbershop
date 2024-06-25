"use client";
import React, { useEffect } from "react";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroVideo from "@/components/HeroVideo";
import LatestSection from "@/components/LatestSection";
import { Videos } from "@/data/videos";
import { Projects } from "@/data/projects";

export default function Body() {
  return (
    <div className="relative flex w-full min-h-screen flex-col items-center justify-start overflow-hidden">
      <HeroVideo className="" videos={Videos} />
      <LatestSection className="" projects={Projects} />
      <AboutSection className="" />
      <ContactSection className="" />
    </div>
  );
}
