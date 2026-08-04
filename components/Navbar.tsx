"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 mix-blend-difference ${scrolled
          ? "py-5 px-6 md:px-12"
          : "py-8 px-6 md:px-16"
        }`}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center w-full">

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
          <span className="text-xl md:text-2xl tracking-[0.3em] font-bold text-white whitespace-nowrap">
            JESKO JETS
          </span>
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
          className="md:hidden text-white p-2 ml-auto"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 px-8 py-8 flex flex-col gap-6 animate-fadeIn">
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
        </div>
      )}
    </header>
  );
}
