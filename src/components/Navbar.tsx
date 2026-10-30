import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Volume2, VolumeX, Gamepad2, Menu, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { DhirajLogo } from './DhirajLogo';

interface NavbarProps {
  onOpenArcade: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
  /** Hidden while the page-load intro flies its own copy of the logo into this spot */
  hideLogo?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenArcade, soundMuted, onToggleSound, hideLogo = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('OVERVIEW');

  const navLinks = [
    { label: 'OVERVIEW', href: '#overview' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'SIMULATOR', href: '#simulator' },
    { label: 'STACK', href: '#skills' },
    { label: 'PRINCIPLES', href: '#principles' },
    { label: 'JOURNEY', href: '#journey' },
  ];

  // Scroll-spy: the link for whichever section crosses the middle of the screen is active
  useEffect(() => {
    const labelFor: Record<string, string> = {
      overview: 'OVERVIEW', projects: 'PROJECTS', simulator: 'SIMULATOR',
      skills: 'STACK', principles: 'PRINCIPLES', journey: 'JOURNEY',
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && labelFor[e.target.id] && setActiveTab(labelFor[e.target.id])),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    Object.keys(labelFor).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Reading progress: a hairline along the bottom of the bar, with the amber ball riding its tip
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const ballLeft = useTransform(progress, (p) => `calc(${p * 100}% - 3px)`);

  const handleLinkClick = (label: string) => {
    sounds.playTap();
    setActiveTab(label);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div className="w-full max-w-7xl pointer-events-auto">
        <nav className="relative bg-[#F7F2EB]/95 backdrop-blur-md rounded-2xl px-3.5 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 flex items-center justify-between border border-[#E3DACD] shadow-sm transition-all duration-300">
          <div aria-hidden="true" className="absolute left-4 right-4 -bottom-px h-px pointer-events-none">
            <motion.div style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-charcoal/35" />
            <motion.span style={{ left: ballLeft }} className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber" />
          </div>
          
          {/* Left: Brand Logo + Name (Direct, No Box) */}
          <a 
            href="#overview" 
            onClick={() => handleLinkClick('OVERVIEW')}
            className="flex items-center gap-2.5 sm:gap-3 group"
          >
            <span id="nav-logo" className={`shrink-0 ${hideLogo ? 'invisible' : ''}`}>
              <DhirajLogo 
                variant="light" 
                className="block w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:scale-105" 
              />
            </span>
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-[#2B302C] font-sans group-hover:text-amber-dark transition-colors whitespace-nowrap">
              DHIRAJ KUMAR
            </span>
          </a>

          {/* Center: Slash-Separated Navigation Links */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-4 text-xs font-bold uppercase tracking-wider text-[#2B302C]">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                {idx > 0 && (
                  <span className="text-[#2B302C]/30 select-none font-normal">/</span>
                )}
                <a
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  className={`relative transition-colors py-1 ${
                    activeTab === link.label 
                      ? 'text-[#2B302C] font-extrabold' 
                      : 'text-[#2B302C]/75 hover:text-amber-dark'
                  }`}
                >
                  {link.label}
                  {activeTab === link.label && (
                    <motion.span
                      layoutId="nav-marker"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-amber"
                    />
                  )}
                </a>
              </React.Fragment>
            ))}
          </div>

          {/* Right: Sound FX, Arcade & Outlined HIRE ME Button */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
            {/* Audio FX Toggle */}
            <button
              onClick={() => {
                sounds.playTap();
                onToggleSound();
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-xl border transition-all duration-200 flex items-center justify-center shrink-0 ${
                soundMuted 
                  ? 'border-[#E3DACD] bg-[#F7F2EB] text-charcoal-muted hover:text-[#2B302C] hover:border-[#2B302C]' 
                  : 'border-[#2B302C] bg-[#2B302C]/5 text-[#2B302C]'
              }`}
              title={soundMuted ? "Unmute Interstellar Soundtrack" : "Mute Audio FX"}
              aria-label="Sound Toggle"
            >
              {soundMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-charcoal-muted" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-dark" />
              )}
            </button>

            {/* Playable Arcade Mini-Game Chip */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenArcade();
              }}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2B302C]/30 hover:border-[#2B302C] text-[#2B302C] text-xs font-mono font-bold transition-all shrink-0"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-dark" />
              <span>ARCADE</span>
            </button>

            {/* Outlined "HIRE ME" Button */}
            <a
              href="#contact"
              onClick={() => sounds.playTap()}
              className="px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-xl border border-[#2B302C] text-[#2B302C] text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[#2B302C] hover:text-white transition-all shadow-2xs whitespace-nowrap shrink-0"
            >
              HIRE ME
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sounds.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 sm:p-2 rounded-xl border border-[#2B302C]/30 text-[#2B302C] hover:bg-neutral-100 transition-colors shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </nav>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="bg-[#F7F2EB]/98 backdrop-blur-xl rounded-2xl p-5 border border-[#E3DACD] shadow-elevated flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  className="text-xs font-bold uppercase tracking-wider text-[#2B302C] py-2.5 px-3 rounded-xl hover:bg-neutral-100 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-[#2B302C]/40">➜</span>
                </a>
              ))}
              <div className="pt-3 border-t border-[#E3DACD] flex flex-col gap-2 mt-1">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenArcade();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-[#2B302C]/30 text-[#2B302C] text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-neutral-50"
                >
                  <Gamepad2 className="w-4 h-4 text-amber-dark" />
                  <span>PLAY ARCADE GAME</span>
                </button>
                <a
                  href="#contact"
                  onClick={() => {
                    sounds.playTap();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#2B302C] text-white text-xs font-bold uppercase tracking-wider text-center"
                >
                  HIRE ME
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
