"use client";

import { useState } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import Navbar from "@/components/Navbar";
import HeroScroll from "@/components/HeroScroll";
import PlaneMorph from "@/components/PlaneMorph";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import DestinationsTicker from "@/components/DestinationsTicker";
import GlobeFooter from "@/components/GlobeFooter";
import LoadingScreen from "@/components/LoadingScreen";
import BookingModal from "@/components/BookingModal";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  // Preload Sequence 1 (240 frames of clouds / jet approach at 30fps)
  const seq1 = useImagePreloader("/window-scene", 240, 3);

  // Preload Sequence 2 (250 frames of plane rotation at 30 fps)
  const seq2 = useImagePreloader("/sequence-2", 250, 4);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const isAllLoaded = seq1.isLoaded && seq2.isLoaded;
  const totalProgress = Math.round((seq1.progress + seq2.progress) / 2);

  const { scrollYProgress } = useScroll();
  
  // Background transition mapping based on sections:
  // Hero (dark) -> Plane/Accordion (light). We keep it light at the end because the Ticker and Footer draw their own black backgrounds!
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.42, 1],
    ["#050505", "#050505", "#d9e4e8", "#f4ebe1"]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="relative text-[#1c1c1c] min-h-screen selection:bg-white selection:text-black transition-colors duration-300"
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {!isAllLoaded && <LoadingScreen progress={totalProgress} />}
      </AnimatePresence>

      {/* Main Scrollytelling Sections (Mounted and ready) */}
      <div className={isAllLoaded ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
        <Navbar onBookClick={() => setIsBookingModalOpen(true)} />
        <HeroScroll images={seq1.images} onBookClick={() => setIsBookingModalOpen(true)} />
        <PlaneMorph images={seq2.images} onBookClick={() => setIsBookingModalOpen(true)} />
        <FeaturesAccordion onBookClick={() => setIsBookingModalOpen(true)} />
        <DestinationsTicker />
        <GlobeFooter onBookClick={() => setIsBookingModalOpen(true)} />
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </motion.div>
  );
}
