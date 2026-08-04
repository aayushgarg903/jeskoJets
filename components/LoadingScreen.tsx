"use client";

import { motion } from "framer-motion";
import { Plane } from "lucide-react";

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center px-6 text-white origin-top"
    >
      {/* Brand Title */}
      <div className="overflow-hidden mb-2">
        <motion.h1 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="text-2xl md:text-3xl font-bold tracking-[0.4em] uppercase text-white"
        >
          JESKO JETS
        </motion.h1>
      </div>

      <div className="flex gap-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 mb-12 font-light overflow-hidden">
        {["Transcend", "the", "Clouds"].map((word, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: [0.76, 0, 0.24, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Progress Bar Container */}
      <div className="w-48 md:w-64 h-[1px] bg-white/10 relative mb-4">
        <motion.div
          className="absolute top-0 left-0 h-full bg-white"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Percentage Count */}
      <span className="text-[10px] tracking-[0.3em] font-mono text-white/50">
        {progress}%
      </span>
    </motion.div>
  );
}
