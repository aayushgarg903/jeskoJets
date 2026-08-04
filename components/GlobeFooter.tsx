"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass, ShieldCheck, Clock } from "lucide-react";

interface GlobeFooterProps {
  onBookClick?: () => void;
}

export default function GlobeFooter({ onBookClick }: GlobeFooterProps) {
  return (
    <footer className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-[#050505] text-white" id="contact">
      {/* Background Video */}
      <video
        src="/globe-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen scale-105"
      />

      {/* Dark Ambient Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505] z-0 pointer-events-none" />

      {/* Top Spacer for layout balance */}
      <div className="relative z-10 pt-24" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <span className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/60 mb-4 font-light">
            Unlimited Horizons
          </span>

          <h2 className="text-4xl md:text-7xl font-extrabold tracking-[0.15em] uppercase text-white mb-6 leading-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            Global Reach, <br className="hidden sm:block" /> Local Touch.
          </h2>

          <p className="text-sm md:text-lg text-white/70 tracking-widest uppercase max-w-2xl font-light mb-10 leading-relaxed">
            Seamless travel across continents. The world is yours.
          </p>

          {/* CTA Button */}
          <button
            onClick={onBookClick}
            className="group relative inline-flex items-center gap-3 border border-white/30 px-10 py-5 text-xs md:text-sm tracking-[0.25em] uppercase font-semibold text-white bg-black/40 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
          >
            <span>Book Your Flight</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>

        {/* Brand Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 w-full border-t border-b border-white/10 py-8 text-center"
        >
          <div className="flex flex-col items-center">
            <Compass className="w-5 h-5 text-white/60 mb-2" />
            <span className="text-lg font-bold tracking-widest">150+</span>
            <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase mt-1">Countries Served</span>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-5 h-5 text-white/60 mb-2" />
            <span className="text-lg font-bold tracking-widest">24/7</span>
            <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase mt-1">Private Flight Concierge</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-white/60 mb-2" />
            <span className="text-lg font-bold tracking-widest">ARGUS Platinum</span>
            <span className="text-[10px] tracking-[0.25em] text-white/50 uppercase mt-1">Safety Rating</span>
          </div>
        </motion.div>
      </div>

      {/* Footer Navigation & Legal Links */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest text-white/40 uppercase">
        <div>
          &copy; {new Date().getFullYear()} JESKO JETS INTERNATIONAL. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Safety Standards</a>
        </div>
      </div>
    </footer>
  );
}
