"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div 
        className={`w-full transition-all duration-700 mix-blend-difference ${
          scrolled ? "py-5 px-6 md:px-12" : "py-8 px-6 md:px-16"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between md:grid md:grid-cols-3 w-full">
          
          {/* Mobile Left Spacer (Balances the hamburger icon to keep logo perfectly centered on mobile) */}
          <div className="md:hidden w-12" />

        {/* Left Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 justify-start">
          {["About", "Our Fleet", "Advantages", "Global"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-white font-bold hover:text-white/70 transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Center Logo/Wordmark */}
        <div className="flex items-center justify-center">
          <Link href="/" className="text-base md:text-2xl font-light tracking-[0.15em] md:tracking-[0.3em] text-white uppercase z-50 shrink-0">
            Jesko Jets
          </Link>
        </div>

        {/* Right Contact Info & CTA */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 justify-end text-[10px] lg:text-[11px] font-bold tracking-[0.1em] text-white">
          <a href="tel:+919034010351" className="hover:text-white/70 transition-colors whitespace-nowrap">+91 9034010351</a>
          <button 
            onClick={onBookClick}
            className="px-5 py-2 lg:px-6 lg:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap inline-block"
          >
            Book a Flight
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 ml-auto focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-7 h-7 font-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 font-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
    </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#050505] pt-28 px-8 pb-8 flex flex-col gap-6 w-full h-screen overflow-y-auto pointer-events-auto"
          >
            {["About", "Our Fleet", "Advantages", "Global"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-white tracking-wide"
              >
                {link}
              </a>
            ))}
            <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10 text-white font-bold text-sm">
              <a href="tel:+919034010351">+91 9034010351</a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick?.();
                }}
                className="text-left py-2 hover:text-white/70 transition-colors uppercase tracking-widest text-xs"
              >
                Book a Flight
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
