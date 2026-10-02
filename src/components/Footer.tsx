import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { DhirajLogo } from './DhirajLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sounds.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-charcoal-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-charcoal-border/60 items-center justify-between">
          
          {/* Brand Left (6 cols) */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#242925] border border-charcoal-border p-1.5 flex items-center justify-center">
                <DhirajLogo variant="on-dark" className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg font-sans tracking-tight">
                {personalInfo.name}
              </span>
            </div>

            <p className="text-xs text-charcoal-faded max-w-md leading-relaxed font-sans">
              AI Engineer building self-correcting multi-agent systems, 3-tier deterministic verification platforms, and high-throughput computer vision engines.
            </p>
          </div>

          {/* Nav Links (4 cols) */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gray-300">
            <a href="#overview" onClick={() => sounds.playTap()} className="hover:text-amber transition-colors">Overview</a>
            <a href="#simulator" onClick={() => sounds.playTap()} className="hover:text-amber transition-colors">Simulator</a>
            <a href="#projects" onClick={() => sounds.playTap()} className="hover:text-amber transition-colors">Projects</a>
            <a href="#skills" onClick={() => sounds.playTap()} className="hover:text-amber transition-colors">Skills</a>
            <a href="#principles" onClick={() => sounds.playTap()} className="hover:text-amber transition-colors">Craft</a>
            <a href="#journey" onClick={() => sounds.playTap()} className="hover:text-amber transition-colors">Journey</a>
          </div>

          {/* Back to Top (2 cols) */}
          <div className="md:col-span-2 flex justify-start md:justify-end">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-charcoal-card border border-charcoal-border text-amber hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono"
              title="Scroll to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-charcoal-faded">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={personalInfo.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber transition-colors"
            >
              Twitter / X
            </a>
            <span>•</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
