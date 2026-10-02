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

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Agent Simulator', href: '#simulator' },
    { label: 'Flagship Projects', href: '#projects' },
    { label: 'Technical Stack', href: '#skills' },
    { label: 'Engineering Craft', href: '#principles' },
    { label: 'Journey', href: '#journey' },
  ];

  const handleLinkClick = () => {
    sounds.playTap();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <nav className="glass-panel rounded-2xl px-5 py-3.5 flex items-center justify-between shadow-subtle border border-[#E5DDCF]/80">
          
          {/* Logo / Monogram */}
          <a 
            href="#overview" 
            onClick={() => sounds.playTap()}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-charcoal flex items-center justify-center text-amber font-bold font-sans tracking-tight text-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
              DK
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-charcoal text-sm tracking-tight leading-none group-hover:text-charcoal-muted transition-colors">
                Dhiraj Kumar
              </span>
              <span className="text-[11px] font-mono text-charcoal-muted tracking-wider uppercase mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Engineer
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="text-[13.5px] font-medium text-charcoal/80 hover:text-charcoal hover:font-semibold transition-all relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Sound FX Toggle */}
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-center text-xs ${
                soundMuted 
                  ? 'border-[#E5DDCF] bg-ecru-50 text-charcoal-muted hover:border-charcoal/30' 
                  : 'border-amber/50 bg-amber/10 text-charcoal shadow-sm'
              }`}
              title={soundMuted ? "Unmute UI Audio FX" : "Mute UI Audio FX"}
              aria-label="Sound Toggle"
            >
              {soundMuted ? <VolumeX className="w-4 h-4 text-charcoal-muted" /> : <Volume2 className="w-4 h-4 text-amber-dark" />}
            </button>

            {/* Playable Arcade Mini-Game Trigger */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenArcade();
              }}
              className="px-3.5 py-2 rounded-xl bg-charcoal text-amber text-xs font-semibold flex items-center gap-2 hover:bg-charcoal-deep transition-all transform hover:scale-[1.02] shadow-sm group"
            >
              <Gamepad2 className="w-4 h-4 text-amber group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Play Arcade</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber/20 text-amber font-normal">GAME</span>
            </button>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber text-charcoal-deep text-xs font-bold hover:bg-amber-light transition-all shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                sounds.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl border border-[#E5DDCF] text-charcoal hover:bg-white/50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 pt-2">
          <div className="glass-panel rounded-2xl p-5 border border-[#E5DDCF] shadow-elevated flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="text-sm font-semibold text-charcoal py-2 px-3 rounded-lg hover:bg-white/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[#E5DDCF] flex flex-col gap-2">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full text-center py-2.5 rounded-xl bg-amber text-charcoal-deep text-sm font-bold shadow-sm"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
