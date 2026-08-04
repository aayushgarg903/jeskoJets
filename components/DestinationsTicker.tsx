"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CITIES = [
  "Abu Dhabi", "Lagos", "Zurich", "Melbourne", "Mexico City", 
  "Miami", "London", "Geneva", "Shanghai", "Paris", 
  "Dubai", "Berlin", "Marrakech", "Tokyo", "Mykonos", 
  "Cape Town", "Toronto", "São Paulo", "Doha", "Bangkok", 
  "Singapore", "Milan", "Cairo", "New York", "Los Angeles", "Hong Kong"
];

export default function DestinationsTicker() {
  const [activeIndex, setActiveIndex] = useState(4); // Start at Mexico city

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CITIES.length);
    }, 2500); // Change every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="global" className="relative w-full h-[30vh] md:h-[40vh] bg-[#050505] text-white flex items-center justify-center overflow-hidden">
      {/* Seamless blend from the light section above */}
      <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#f4ebe1] to-transparent z-20 pointer-events-none" />

      <div className="flex items-center gap-4 md:gap-8 z-10 w-full max-w-4xl px-6 md:px-12">
        {/* Left: Text */}
        <div className="text-xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
          Fly anywhere
        </div>

        {/* Middle: Icon & Lines */}
        <div className="flex items-center flex-1 gap-2 md:gap-4 opacity-70">
          <div className="h-[1px] bg-white/20 flex-1" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 md:w-6 md:h-6 text-white rotate-45 transform"
          >
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2-.5-3.5 2L14.5 9.5 6.3 7.7c-.5-.1-.9.1-1.1.5l-1.9 3c-.2.3-.1.7.2.9l6.1 2.3-2.6 2.6-2.9-.6c-.3-.1-.7 0-.9.3l-1.4 1.4c-.3.3-.3.7 0 .9l4.5 1.5 1.5 4.5c.2.3.6.3.9 0l1.4-1.4c.3-.2.4-.6.3-.9l-.6-2.9 2.6-2.6 2.3 6.1c.2.3.6.4.9.2l3-1.9c.4-.2.6-.6.5-1.1z" />
          </svg>
          <div className="h-[1px] bg-white/20 flex-1" />
        </div>

        {/* Right: Scrolling Cities */}
        <div className="h-[200px] md:h-[250px] w-[180px] md:w-[250px] relative overflow-hidden flex items-center">
          {/* Fade Top/Bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
          
          <motion.div 
            className="absolute left-0 w-full flex flex-col"
            animate={{ y: `-${activeIndex * 40}px` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ top: '50%', marginTop: '-20px' }} // Exact center alignment for 40px height items
          >
            {CITIES.map((city, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(index - activeIndex);
              
              // Dim more based on distance
              let opacityClass = "opacity-5";
              if (isActive) opacityClass = "opacity-100";
              else if (distance === 1) opacityClass = "opacity-40";
              else if (distance === 2) opacityClass = "opacity-20";
              
              return (
                <div
                  key={index}
                  className={`h-[40px] flex items-center text-xl md:text-3xl font-bold transition-all duration-700 ease-out whitespace-nowrap tracking-tight ${isActive ? 'text-white' : 'text-white/50'} ${opacityClass}`}
                >
                  {city}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
