"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroScrollProps {
  images: HTMLImageElement[];
}

export default function HeroScroll({ images }: HeroScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastRenderedIndexRef = useRef<number>(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Text overlay motion values
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 0, -50]);

  const subTextOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.85, 0.95], [0, 1, 1, 0]);
  const subTextY = useTransform(scrollYProgress, [0.45, 0.6, 0.85, 0.95], [40, 0, 0, -40]);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || !images || images.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const safeIndex = Math.max(0, Math.min(images.length - 1, index));
      const img = images[safeIndex];

      if (!img || !img.complete || img.naturalWidth === 0) return;

      // Handle Retina displays & canvas sizing
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

      // Cover scaling math
      const scale = Math.max(width / img.width, height / img.height);
      const x = width / 2 - (img.width / 2) * scale;
      const y = height / 2 - (img.height / 2) * scale;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      ctx.restore();

      lastRenderedIndexRef.current = safeIndex;
    },
    [images]
  );

  // Synchronize canvas rendering with scroll progress
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

  // Initial draw & window resize listener
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
    <section id="about" ref={containerRef} className="relative h-[500vh] w-full bg-transparent">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Canvas background sequence with subtle ambient movement */}
        <motion.canvas
          ref={canvasRef}
          animate={{
            scale: [1, 1.05, 1],
            x: [0, -10, 0],
            y: [0, 5, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-darken opacity-80"
        />

        {/* Ambient Vignette to darken edges for white text */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#151110_100%)] pointer-events-none" />

        {/* Master Overlay (All text elements from the design) */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 md:p-16 lg:py-24 lg:px-12 xl:px-16"
        >
          {/* Top Level: Left Huge Text */}
          <div className="mt-12 md:mt-16">
            <h1 className="text-6xl md:text-7xl lg:text-[80px] xl:text-[90px] font-bold tracking-tight text-white leading-[0.9]">
              We are <br /> movement
            </h1>
          </div>

          {/* Center Floating Logo - Hidden on mobile to prevent overlap */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-3xl md:text-5xl font-light text-white tracking-[0.2em] opacity-80 uppercase">
              Jesko Jets
            </span>
          </div>

          {/* Bottom Level: Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 md:gap-8 mt-auto pb-4 md:pb-12">
            
            {/* Bottom Left: Freedom Text */}
            <div className="max-w-[280px]">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-5 leading-tight">
                Your <br /> freedom to <br /> enjoy life
              </h3>
              <div className="w-12 h-[1px] bg-white/50 mb-5" />
              <p className="text-[10px] text-white/80 font-medium leading-relaxed">
                Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
              </p>
            </div>

            {/* Bottom Center: CTA Button */}
            <div className="flex md:justify-center mb-0 md:mb-[-1rem] pointer-events-auto">
              <div className="flex items-center gap-2">
                <a href="#contact" className="bg-white text-black px-6 md:px-8 py-3 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/90 transition-colors">
                  Book the Flight
                </a>
                <a href="#contact" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
                  <svg className="w-4 h-4 text-black transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </a>
              </div>
            </div>

            {/* Bottom Right: Distinction & Scroll */}
            <div className="flex flex-col items-start md:items-end text-left md:text-right mt-4 md:mt-0">
              <h1 className="text-[40px] md:text-6xl lg:text-[75px] xl:text-[85px] font-bold tracking-tight text-white leading-[0.9] mb-6 md:mb-10">
                We are <br /> distinction
              </h1>
              <div className="w-full h-[1px] bg-white/30 mb-5" />
              <div className="w-full flex justify-between items-center text-[8px] md:text-[9px] font-bold tracking-[0.2em] text-white uppercase">
                <div className="flex items-center gap-2">
                  <ChevronDown className="w-3 h-3 animate-bounce" />
                  <span>Scroll Down</span>
                </div>
                <span>To Start The Journey</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Secondary Overlay (About Jesko Jets - Fades in mid scroll) */}
        <motion.div
          style={{ opacity: subTextOpacity, y: subTextY }}
          className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-8 md:p-16 lg:py-24 lg:px-12 xl:px-16"
        >
          {/* Top/Center Huge Paragraph */}
          <div className="flex-1 flex flex-col justify-center items-center text-center mt-12 md:mt-20">
            <h2 className="text-2xl md:text-4xl lg:text-[45px] xl:text-[55px] font-bold tracking-tight text-white leading-[1.2] max-w-[85%] mx-auto">
              Jesko Jets<sup className="text-lg md:text-2xl font-light">®</sup> is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust <span className="text-white/40">us to deliver on time, every time.</span>
            </h2>
          </div>

          {/* Bottom Level: Grid Layout (About details) */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-8 mt-auto pb-8 md:pb-12 text-white">
            
            {/* Bottom Left: Brand Elements */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {/* Globe / JR Logo representation */}
                <svg className="w-6 h-6 md:w-8 md:h-8 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span className="text-2xl md:text-3xl font-light tracking-tighter opacity-80">jr</span>
              </div>
              <div className="text-[7px] md:text-[8px] font-bold tracking-[0.2em] uppercase leading-tight">
                Jesko Jets<br/>Global Private Aviation
              </div>
            </div>

            {/* Bottom Center: Direct Access & CTA */}
            <div className="flex flex-col items-start pointer-events-auto max-w-[280px]">
              <h3 className="text-lg md:text-xl font-bold tracking-tight mb-4 leading-tight">
                Direct Access to<br/>Private Travel
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <a href="#contact" className="bg-white text-black px-5 py-2 rounded-full text-[9px] md:text-[10px] font-bold hover:bg-white/90 transition-colors">
                  Book the Flight
                </a>
                <a href="#contact" className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors">
                  <svg className="w-3 h-3 text-black transform rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </a>
              </div>
              <p className="text-[8px] md:text-[9px] text-white/80 font-medium leading-relaxed">
                Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the moment you book to arrival.
              </p>
            </div>

            {/* Bottom Right: Freedom Text */}
            <div className="flex flex-col items-start max-w-[280px] ml-auto">
              <h3 className="text-lg md:text-xl font-bold tracking-tight mb-4 leading-tight">
                Your Freedom to<br/>Enjoy Life
              </h3>
              <div className="w-8 h-[1px] bg-white/50 mb-4" />
              <p className="text-[8px] md:text-[9px] text-white/80 font-medium leading-relaxed">
                We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
