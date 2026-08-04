"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    title: "Pets",
    description: "Traveling with pets on a private jet means comfort and peace of mind for both owners and their companions. Our dedicated team ensures seamless arrangements, from documentation and safety to onboard care, so that your pet enjoys the same level of attention and luxury as you do. Every detail is managed to create a stress-free and enjoyable journey for everyone on board.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "24/7 availability",
    description: "Our team is available around the clock to handle any request, no matter the time zone or urgency. From last-minute flight arrangements to personalized services, we provide seamless support whenever you need it. With us, assistance is never more than a call away.",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Onboard services",
    description: "Every flight is tailored with a range of personalized onboard services designed to elevate your journey. From fine dining and curated entertainment to attentive crew and seamless connectivity, every detail is arranged to ensure maximum comfort and enjoyment in the air.",
    image: "https://images.unsplash.com/photo-1569389397653-c04fe624e663?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Efficient",
    description: "Efficiency is at the core of every flight we operate. From optimized routes and streamlined procedures to quick boarding and smooth ground handling, we make sure your time is always used wisely. The result is a seamless journey that gets you where you need to be, faster and without compromise.",
    image: "https://images.unsplash.com/photo-1494515426402-f1980ace7a9c?q=80&w=1200&auto=format&fit=crop",
  }
];

interface FeaturesAccordionProps {
  onBookClick?: () => void;
}

export default function FeaturesAccordion({ onBookClick }: FeaturesAccordionProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="advantages" className="w-full bg-transparent py-24 min-h-screen relative flex items-center">
      <div className="w-full mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col h-full max-w-lg lg:pr-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-12 md:mb-20 text-[#1c1c1c]">
            A Better Way To Fly
          </span>

          <div className="flex flex-col w-full border-t border-[#1c1c1c]/10">
            {features.map((feature, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className="border-b border-[#1c1c1c]/10">
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="w-full py-6 md:py-8 flex justify-between items-center text-left group"
                  >
                    <span className="text-2xl md:text-[32px] font-bold tracking-tight text-[#1c1c1c] group-hover:opacity-70 transition-opacity">
                      {feature.title}
                    </span>
                    <span className="text-3xl font-light text-[#1c1c1c] w-6 flex justify-center group-hover:opacity-70 transition-opacity">
                      {isActive ? "−" : "+"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-[11px] md:text-xs text-[#1c1c1c]/80 leading-[1.8] font-medium pr-4">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex items-center justify-center lg:justify-start gap-2">
            <button onClick={onBookClick} className="bg-white text-black px-6 py-3 rounded-full text-[11px] md:text-xs font-bold hover:bg-white/90 transition-colors shadow-sm border border-[#1c1c1c]/5">
              Book the Flight
            </button>
            <button onClick={onBookClick} className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors shadow-sm border border-[#1c1c1c]/5">
              <svg className="w-4 h-4 text-black transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="relative h-[60vh] lg:h-[85vh] w-full max-w-2xl ml-auto overflow-hidden shadow-2xl bg-[#050505]">
          <AnimatePresence>
            <motion.img
              key={activeIndex}
              src={features[activeIndex].image}
              alt={features[activeIndex].title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
}
