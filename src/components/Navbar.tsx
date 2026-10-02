import React, { useState } from 'react';
import { Volume2, VolumeX, Gamepad2, Menu, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  onOpenArcade: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenArcade, soundMuted, onToggleSound }) => {
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

  const handleLinkClick = (label: string) => {
    sounds.playTap();
    setActiveTab(label);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="w-full max-w-7xl pointer-events-auto">
        <nav className="bg-white/95 backdrop-blur-md rounded-2xl px-5 sm:px-7 py-3 flex items-center justify-between border border-[#E3DACD] shadow-sm transition-all duration-300">
          
          {/* Left: Brand Monogram Box + Name */}
          <a 
            href="#overview" 
            onClick={() => handleLinkClick('OVERVIEW')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2B302C] flex items-center justify-center text-white font-extrabold font-mono text-xs tracking-wider shadow-2xs transition-transform duration-200 group-hover:scale-105">
              DK
            </div>
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
                  className={`transition-colors py-1 ${
                    activeTab === link.label 
                      ? 'text-[#2B302C] font-extrabold' 
                      : 'text-[#2B302C]/75 hover:text-amber-dark'
                  }`}
                >
                  {link.label}
                </a>
              </React.Fragment>
            ))}
          </div>

          {/* Right: Sound FX, Arcade & Outlined HIRE ME Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio FX Toggle */}
            <button
              onClick={() => {
                sounds.playTap();
                onToggleSound();
              }}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border transition-all duration-200 flex items-center justify-center ${
                soundMuted 
                  ? 'border-[#E3DACD] bg-white text-charcoal-muted hover:text-[#2B302C] hover:border-[#2B302C]' 
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
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2B302C]/30 hover:border-[#2B302C] text-[#2B302C] text-xs font-mono font-bold transition-all"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-dark" />
              <span>ARCADE</span>
            </button>

            {/* Outlined "HIRE ME" Button */}
            <a
              href="#contact"
              onClick={() => sounds.playTap()}
              className="px-4 sm:px-6 py-2 rounded-xl border border-[#2B302C] text-[#2B302C] text-xs font-bold uppercase tracking-wider hover:bg-[#2B302C] hover:text-white transition-all shadow-2xs whitespace-nowrap"
            >
              HIRE ME
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sounds.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 rounded-xl border border-[#2B302C]/30 text-[#2B302C] hover:bg-neutral-100 transition-colors ml-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </nav>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 border border-[#E3DACD] shadow-elevated flex flex-col gap-2">
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
