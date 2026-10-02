import React, { useState } from 'react';
import { Volume2, VolumeX, Gamepad2, Menu, X, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  onOpenArcade: () => void;
  soundMuted: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenArcade, soundMuted, onToggleSound }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Overview');

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Simulator', href: '#simulator' },
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#skills' },
    { label: 'Craft', href: '#principles' },
    { label: 'Journey', href: '#journey' },
  ];

  const handleLinkClick = (label: string) => {
    sounds.playTap();
    setActiveTab(label);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="w-full max-w-6xl pointer-events-auto">
        <nav className="glass-panel rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between shadow-elevated border border-[#E0D5C3]/90 bg-[#F7F2EB]/90 backdrop-blur-xl transition-all duration-300">
          
          {/* Left: Brand Monogram & Status */}
          <a 
            href="#overview" 
            onClick={() => handleLinkClick('Overview')}
            className="flex items-center gap-2.5 group py-0.5 pl-1"
          >
            <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center text-amber font-extrabold font-sans text-xs tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
              DK
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-charcoal text-xs tracking-tight group-hover:text-amber-dark transition-colors whitespace-nowrap">
                Dhiraj Kumar
              </span>
              <span className="text-[10px] font-mono text-charcoal-muted tracking-wider uppercase flex items-center gap-1 leading-none mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Engineer
              </span>
            </div>
          </a>

          {/* Center: Sleek Segmented Pill Navigation */}
          <div className="hidden md:flex items-center gap-1 p-1 bg-white/70 rounded-full border border-[#E5DDCF]/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-charcoal text-white shadow-sm'
                      : 'text-charcoal-muted hover:text-charcoal hover:bg-black/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right: Compact Utility Cluster */}
          <div className="flex items-center gap-2 pr-1">
            
            {/* Audio FX Toggle */}
            <button
              onClick={() => {
                sounds.playTap();
                onToggleSound();
              }}
              className={`w-8 h-8 rounded-full border transition-all duration-200 flex items-center justify-center ${
                soundMuted 
                  ? 'border-[#E3DACD] bg-white/60 text-charcoal-muted hover:text-charcoal hover:bg-white' 
                  : 'border-amber/60 bg-amber/15 text-charcoal shadow-sm'
              }`}
              title={soundMuted ? "Unmute UI Audio FX" : "Mute UI Audio FX"}
              aria-label="Sound Toggle"
            >
              {soundMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-charcoal-muted" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-amber-dark" />
              )}
            </button>

            {/* Playable Arcade Mini-Game Chip */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenArcade();
              }}
              className="px-3 py-1.5 rounded-full bg-charcoal text-amber text-xs font-bold flex items-center gap-1.5 hover:bg-charcoal-deep transition-all transform hover:scale-[1.03] shadow-sm group whitespace-nowrap"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Arcade</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber/20 text-amber font-normal">GAME</span>
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={() => sounds.playTap()}
              className="px-3.5 py-1.5 rounded-full bg-amber text-charcoal-deep text-xs font-bold hover:bg-amber-light transition-all shadow-sm flex items-center gap-1 whitespace-nowrap"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sounds.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-1.5 rounded-full border border-[#E3DACD] text-charcoal hover:bg-white transition-colors ml-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="glass-panel rounded-3xl p-4 border border-[#E3DACD] shadow-elevated bg-[#F7F2EB]/95 backdrop-blur-xl flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  className="text-xs font-semibold text-charcoal py-2 px-3 rounded-xl hover:bg-white/80 transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-charcoal-muted">➜</span>
                </a>
              ))}
              <div className="pt-2 border-t border-[#E5DDCF] flex items-center gap-2 mt-1">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenArcade();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-xl bg-charcoal text-amber text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Play Arcade Game</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
