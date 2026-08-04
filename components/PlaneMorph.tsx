"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface PlaneMorphProps {
  images: HTMLImageElement[];
}

export default function PlaneMorph({ images }: PlaneMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastRenderedIndexRef = useRef<number>(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text overlay: Detailed Aircraft Specs
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 0.95], [40, 0, 0, -40]);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const safeIndex = Math.max(0, Math.min(images.length - 1, index));
      const img = images[safeIndex];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      ctx.clearRect(0, 0, width, height);

      // Cover scaling math (Must be cover, otherwise the image borders are exposed against the gradient background)
      const scale = Math.max(width / img.width, height / img.height);
      const x = width / 2 - (img.width / 2) * scale;
      const y = height / 2 - (img.height / 2) * scale;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      ctx.restore();

      lastRenderedIndexRef.current = safeIndex;
    },
    [images]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!images || images.length === 0) return;
    const targetIndex = Math.min(
      images.length - 1,
      Math.floor(latest * images.length)
    );

    if (targetIndex !== lastRenderedIndexRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        renderFrame(targetIndex);
      });
    }
  });

  useEffect(() => {
    renderFrame(0);

    const handleResize = () => {
      renderFrame(lastRenderedIndexRef.current >= 0 ? lastRenderedIndexRef.current : 0);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [renderFrame]);

  return (
    <section ref={containerRef} className="relative h-[500vh] w-full bg-transparent" id="our-fleet">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas background sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-darken"
        />

        {/* Overlay: Detailed Aircraft Specs */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-30 pointer-events-none p-4 sm:p-6 md:p-12 lg:p-20 flex flex-col justify-between"
        >
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-4 sm:gap-0">
            {/* Top Left: Gulfstream 650ER */}
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm md:text-lg tracking-[0.2em] uppercase font-bold text-black mb-1 md:mb-2 opacity-80">
                Gulfstream
              </span>
              <h2 className="text-[42px] sm:text-6xl md:text-[90px] lg:text-[110px] leading-[0.8] font-black uppercase text-[#111111] tracking-tighter drop-shadow-sm" style={{ fontStretch: 'expanded' }}>
                650ER
              </h2>
            </div>

            {/* Top Right: Range & Description */}
            <div className="flex flex-col w-full max-w-[280px] md:max-w-[300px]">
              <h3 className="text-xs md:text-base tracking-[0.1em] uppercase font-bold text-[#1c1c1c] leading-relaxed mb-4 md:mb-16">
                Ultra-long-range<br className="hidden md:block"/> Aircraft
              </h3>
              
              <div className="hidden sm:block w-full h-[1px] bg-[#1c1c1c]/10 mb-6" />
              <h4 className="hidden sm:block text-[9px] tracking-[0.2em] font-bold text-[#1c1c1c] uppercase mb-6">
                Direct Access To<br/>Private Travel
              </h4>
              <p className="hidden sm:block text-[10px] md:text-[11px] text-[#1c1c1c]/80 font-medium leading-relaxed">
                A true time-saving machine it brings Tokyo and New York an hour closer, and at 92% of the speed of sound, it can circle the globe with just a single stop.
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-end w-full relative pb-16 sm:pb-0">
            
            {/* Bottom Left: Specs Grid */}
            <div className="w-full max-w-[320px] md:max-w-[400px]">
              <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 pb-4 md:pb-6 border-b border-[#1c1c1c]/10">
                <div>
                  <span className="block text-[7px] md:text-[8px] tracking-[0.1em] text-[#1c1c1c]/50 uppercase font-bold mb-1">Max Operating Range</span>
                  <span className="block text-[9px] md:text-xs font-black text-[#1c1c1c] uppercase">11,263 KM</span>
                </div>
                <div>
                  <span className="block text-[7px] md:text-[8px] tracking-[0.1em] text-[#1c1c1c]/50 uppercase font-bold mb-1">Speed</span>
                  <span className="block text-[9px] md:text-xs font-black text-[#1c1c1c] uppercase">480 KNOTS</span>
                </div>
                <div>
                  <span className="block text-[7px] md:text-[8px] tracking-[0.1em] text-[#1c1c1c]/50 uppercase font-bold mb-1">Passenger Capacity</span>
                  <span className="block text-[9px] md:text-xs font-black text-[#1c1c1c] uppercase pr-2 md:pr-4">Up to 12 seats (+1 Server)</span>
                </div>
                <div>
                  <span className="block text-[7px] md:text-[8px] tracking-[0.1em] text-[#1c1c1c]/50 uppercase font-bold mb-1">Endurance</span>
                  <span className="block text-[9px] md:text-xs font-black text-[#1c1c1c] uppercase pr-2 md:pr-4">14 HRS (Max European)</span>
                </div>
                <div>
                  <span className="block text-[7px] md:text-[8px] tracking-[0.1em] text-[#1c1c1c]/50 uppercase font-bold mb-1">Baggage Capacity</span>
                  <span className="block text-[9px] md:text-xs font-black text-[#1c1c1c] uppercase">5.52 M³</span>
                </div>
                <div>
                  <span className="block text-[7px] md:text-[8px] tracking-[0.1em] text-[#1c1c1c]/50 uppercase font-bold mb-1">Cruising Altitude</span>
                  <span className="block text-[9px] md:text-xs font-black text-[#1c1c1c] uppercase">15,544 M</span>
                </div>
              </div>
              
              <div className="pt-4">
                <span className="block text-[8px] tracking-[0.1em] text-[#1c1c1c]/50 uppercase font-bold mb-3">Specification</span>
                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-2 text-[9px] md:text-[10px] font-black text-[#1c1c1c] uppercase">
                    <span>Cabin Length</span><span>14.05 M</span>
                  </div>
                  <div className="grid grid-cols-2 text-[9px] md:text-[10px] font-black text-[#1c1c1c] uppercase">
                    <span>Cabin Width</span><span>2.49 M</span>
                  </div>
                  <div className="grid grid-cols-2 text-[9px] md:text-[10px] font-black text-[#1c1c1c] uppercase">
                    <span>Cabin Height</span><span>1.92 M</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Center: CTA Button (absolute to stay perfectly centered) */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex items-center gap-2 pointer-events-auto">
              <a href="#contact" className="bg-white text-black px-6 py-3 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-colors shadow-lg">
                Book the Flight
              </a>
              <a href="#contact" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors shadow-lg">
                <svg className="w-4 h-4 text-black transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
