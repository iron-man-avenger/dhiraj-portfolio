import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AgentSimulator } from './components/AgentSimulator';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EngineeringLessons } from './components/EngineeringLessons';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArcadeGame } from './components/ArcadeGame';
import { IntroLoader } from './components/IntroLoader';
import { sounds } from './utils/soundEffects';

// Skip the intro for reduced-motion visitors and deep links straight to a section
const shouldPlayIntro = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches && location.hash.length <= 1;

export function App() {
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [introActive, setIntroActive] = useState(shouldPlayIntro);
  const [heroRevealed, setHeroRevealed] = useState(() => !introActive);
  const handleIntroReveal = useCallback(() => setHeroRevealed(true), []);
  const handleIntroDone = useCallback(() => setIntroActive(false), []);

  // The browser jumps to a #section before React has drawn it, so jump once the page exists
  useEffect(() => {
    if (location.hash.length > 1) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }, []);
  const [soundMuted, setSoundMuted] = useState(() => sounds.getMuted());

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setSoundMuted(muted);
  };

  return (
    // reducedMotion="user": visitors who ask for less motion get every animation without its movement
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#F7F2EB] text-[#2B302C] font-sans antialiased selection:bg-[#D4A066] selection:text-[#1E2320] overflow-x-clip max-w-full">

      {/* Page-load intro: logo, name and designation, handing off to the navbar and hero */}
      {introActive && <IntroLoader onReveal={handleIntroReveal} onDone={handleIntroDone} />}

      {/* Top Glass Navigation */}
      <Navbar
        onOpenArcade={() => setIsArcadeOpen(true)}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        hideLogo={introActive}
      />

      <main className="relative overflow-x-clip max-w-full">
        {/* Hero with Signature Interactive Bar Chart (Directly inspired by reference image) */}
        <Hero onOpenArcade={() => setIsArcadeOpen(true)} revealed={heroRevealed} />

        {/* Live Multi-Agent & Verification Simulator */}
        <AgentSimulator />

        {/* In-Depth Flagship Projects & Case Studies */}
        <ProjectsSection />

        {/* Categorized Skills Inventory */}
        <SkillsMatrix />

        {/* Under the Hood: Engineering Lessons & Taxonomy Drift Autopsy */}
        <EngineeringLessons />

        {/* Work Experience, Awards & Certifications */}
        <ExperienceTimeline />

        {/* Direct Contact & Inquiry Dispatch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Playable Mini-Game Modal */}
      <ArcadeGame
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
      />

    </div>
    </MotionConfig>
  );
}

export default App;
